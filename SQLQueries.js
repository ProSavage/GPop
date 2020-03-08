// const chromosome_library = require("./Chromosome.js")
// chromosome = new chromosome_library.Chromosome();
//
// getAllChromosomes() {
//
// }
//
// addShortVariant(filename) {
//
// }
//
// getShortVariantList(sample_id, chromosome_id) {
//
// }

const sqlite3 = require("sqlite3").verbose();
const lodash = require("lodash");
const fs = require("fs");

let read_only_database_filename = "./resources/pop.sqlite";
let preloaded_database_filename = "./resources/preloaded_pop_database.sqlite";
let writable_database_filename = "./resources/temporary.sqlite";
let read_only_database = new sqlite3.Database(read_only_database_filename);
let writable_database = null;

function makePromise(query) {
	console.log(query);
	return new Promise((resolve, reject) => {
		writable_database.all(query, [], (error, rows) => {
			if (error) {
				reject(error);
			} else {
				resolve(rows);
			}
		})
	});
}


/* Only use for one insert at a time */
function insertQuery(query) {
	console.log(query);
	writable_database.run(query);
}

/* database.run("BEGIN TRANSACTION") first, prepareQuery() second, database.run("COMMIT") last*/
function prepareQuery(query) {
	//console.log(query);
	writable_database.run(query);
}

function getChromosomeID(chromosome_name){
	let query = "SELECT id FROM chromosome WHERE name = '" + chromosome_name + "';";
	return makePromise(query).then((query_result)=> {
		return query_result[0].id
	});
}

function loadShortVariant(sample_id, chromosome_id, start_position,
											end_position, reference_sequence, reference_read_count,
											variant_sequence, variant_read_count) {
	let query = "INSERT INTO short_variant (sample_id, chromosome_id, start_position, end_position, " +
		" reference_sequence, reference_read_count, variant_sequence, variant_read_count) " +
		" VALUES (" + sample_id + ", " + chromosome_id + ", " + start_position + ", " +
		end_position + ", '" + reference_sequence + "', " + reference_read_count + ", '" +
		variant_sequence + "', " + variant_read_count + ");";
	return prepareQuery(query);
}

module.exports = {
	/* VERY IMPORTANT TO RUN THIS ONCE BEFORE ANYTHING ELSE!" */
	initialize: function initialize() {
		let fs_status = fs.copyFile(preloaded_database_filename, writable_database_filename, (err) => {
			if (err) throw err;
			console.log('Template database was copied to writable database.');
		});
		writable_database = new sqlite3.Database(writable_database_filename);
	},

	loadSample: function loadSample(name, mother_sample_id, father_sample_id) {
		let query = "INSERT INTO sample (name, mother_sample_id, father_sample_id) VALUES " +
			    " ('" + name + "', " + mother_sample_id + ", " + father_sample_id + ");";
		return insertQuery(query);
	},

	loadShortVariants: async function loadShortVariants(sample_id, short_variant_filename) {
		let chromosomes = await this.getAllChromosomes();
		let chromosome_dictionary = lodash.keyBy(chromosomes, "name");
		//console.log("Chromosome Dictionary: ", chromosome_dictionary);
		//return chromosome_dictionary;
		//let line_reader = require("readline").createInterface({
		//	input: require("fs").createReadStream(short_variant_filename)
		//});
		let line_array = fs.readFileSync(short_variant_filename).toString().split('\n');
		writable_database.run("BEGIN TRANSACTION");
		let line_count = 0;
		//line_reader.on("line", function (line) {
		for (let i in line_array) {
			let line = line_array[i];
			if (line) {
				line_count = line_count + 1;
				if (line_count % 50000 === 1) {
					console.log(line_count, line);
				}
				//console.log("Line: ", line);
				let items = line.split('\t');
				let chromosome_name = items[0];
				//console.log("ChromosomeDictionary["+chromosome_name+"]="+chromosome_dictionary[chromosome_name]);
				let chromosome_id = chromosome_dictionary[chromosome_name]["id"]
				let start_position = items[1];
				let end_position = items[2];
				let reference_sequence = items[3];
				let variant_sequence = items[4];
				let reference_read_count = items[5];
				let variant_read_count = items[6];
				loadShortVariant(sample_id, chromosome_id, start_position, end_position, reference_sequence,
					reference_read_count, variant_sequence, variant_read_count);
				//});
			}
		}
		//line_reader.on("end", function() {
			console.log("Committing...");
			writable_database.run("COMMIT");
			console.log("Committed.");
		//});
	},

	loadCopyNumberVariant: function loadCopyNumberVariant(sample_id, chromosome_id, start_position, reference_copy_count, variant_copy_count) {
		let query = "INSERT INTO copy_number_variant (sample_id, chromosome_id, start_position, reference_copy_count, variant_copy_count" +
			" VALUES (" +sample_id + ", " + chromosome_id + ", " + start_position + ", " + reference_copy_count +
			", " + variant_copy_count + ");"
		makePromise(query);
	},

	loadCopyNumberVariants: function loadCopyNumberVariants(sample_id, copy_number_variants_file) {
		const file_reader = new FileReader();
		file_reader.onload = (progress_event) => {
			const sql_queries = require("./SQLQuries.js");
			const file = progress_event.target.result;
			const lines = file.split(/\r\n|\n/);
			// Reading line by line
			lines.forEach((line) => {
				let items = line.split(splitter='\t');
				let chromosome_name = items[0];
				let chromosome_id = sql_queries.getChromosomeIDs(chromosome_name)[0];
				let start_position = items[1];
				let reference_copy_count = items[3];
				let variant_copy_count = items[4];
				this.loadCopyNumberVariant(sample_id, chromosome_id, start_position, reference_copy_count, variant_copy_count)
			});
		};
		file_reader.onerror = (progress_event) => {
			alert(progress_event.target.error.name);
		};
		file_reader.readAsText(copy_number_variants_file);
	},

	getSampleIDs: function getSampleID(sample_name) {
		let query = "SELECT id FROM sample WHERE name = '" + sample_name + "';";
		return makePromise(query);
	},

	getChromosomeIDs: function getChromosomeIDs(chromosome_name) {
		let query = "SELECT id FROM chromosome WHERE name = '" + chromosome_name + "';";
		return makePromise(query);
	},

	getAllSamples: function getAllSamples() {
		let query = "SELECT id, name, mother_sample_id, father_sample_id FROM sample";
		return makePromise(query);
	},

	getAllChromosomes: function getAllChromosomes() {
		let query = "SELECT id, name, size FROM chromosome ORDER BY name;";
		return makePromise(query);
	},

	getAllExons: function getAllExons() {
		let query = "SELECT id, chromosome_id, start_position, end_position FROM exon " +
		            " ORDER BY start_position;";
		return makePromise(query);
	},

	getExonsByChromosome: function getExonsByChromosome(chromosome_id) {
		let query = "SELECT id, start_position, end_position FROM exon " +
			        "WHERE chromosome_id = " + chromosome_id + " ORDER BY start_position;";
		return makePromise(query);
	},

	getExonsByChromosomeAndStartPosition: function getExonsByChromosomeAndStartPosition(chromosome_id, start_position) {
		let query = "SELECT id, end_position FROM exon " +
			         "WHERE chromosome_id = " + chromosome_id +
			         "  AND start_position = " + start_position + " ORDER BY start_position;";
		return makePromise(query);
	},

	getAllGenes: function getAllGenes() {
		let query =  "SELECT id, chromosome_id, name, start_position, end_position " +
			         " FROM gene ORDER BY start_position;";
		return makePromise(query);
	},

	getGenesByChromosome: function getGenesByChromosome(chromosome_id) {
		let query = "SELECT id, name, start_position, end_position FROM gene " +
			        " WHERE chromosome_id  = " + chromosome_id + " ORDER BY start_position;";
		return makePromise(query);
	},

	getGenesByChromosomeAndStartPosition: function getGenesByChromosomeAndStartPosition(chromosome_id, start_position) {
		let query = "SELECT  id, name, end_position FROM gene WHERE chromosome_id = " +
			        chromosome_id + " AND start_position = " + start_position +
			        " ORDER  BY start_position;"
		return makePromise(query);
	},

	getAllShortVariantsBySampleIDAndChromosome: function getAllShortVariantsBySampleIDAndChromosome(sample_id, chromosome_id) {
		let query = "SELECT id, start_position, end_position, reference_sequence," +
			"reference_read_count, variant_sequence, variant_read_count" +
			" FROM short_variant" +
			" WHERE sample_id = " + sample_id +
			"  AND chromosome_id = " + chromosome_id + " ORDER BY start_position;";
		return makePromise(query);
	},

	getAllCopyNumberVariantsBySampleIDAndChromosome: function getAllCopyNumberVariantsBySampleIDAndChromosome(sample_id, chromosome_id) {
		let query = "SELECT id, start_position, reference_copy_count, variant_copy_count, sample_id " +
			" FROM copy_number_variant " +
		" WHERE sample_id = " + sample_id +
		"  AND chromosome_id = " + chromosome_id + " ORDER BY start_position;";
		return makePromise(query);
	}
};

