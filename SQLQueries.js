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
let database = new sqlite3.Database("./resources/pop.sqlite")

function makePromise(query) {
	return new Promise((resolve, reject) => {
		database.all(query, [], (error, rows) => {
			if (error) {
				reject(error);
			} else {
				resolve(rows);
			}
		})
	});
}

module.exports = {
	getChromosomes: function getChromosomes() {
		let query = "SELECT id, name, size FROM chromosome ORDER BY name;";
		return makePromise(query);
	},

	getExons: function getExons() {
		let query = "SELECT id, chromosome_id, start_position, end_position FROM exon " +
		            " ORDER BY start_position;";
		return makePromise(query);
	},

	getExons: function getExons(chromosome_id) {
		let query = "SELECT id, start_position, end_position FROM exon " +
			        "WHERE chromosome_id = " + chromosome_id + " ORDER BY start_position;";
		return makePromise(query);
	},

	getExons: function getExons(chromosome_id, start_position) {
		let query = "SELECT id, end_position FROM exon " +
			         "WHERE chromosome_id = " + chromosome_id +
			         "  AND start_position = " + start_position + " ORDER BY start_position;";
		return makePromise(query);
	},

	getGenes: function getGenes() {
		let query =  "SELECT id, chromosome_id, name, start_position, end_position " +
			         " FROM gene ORDER BY start_position;";
		return makePromise(query);
	},

	getGenes: function getGenes(chromosome_id) {
		let query = "SELECT id, name, start_position, end_position FROM gene " +
			        " WHERE chromosome_id  = " + chromosome_id + " ORDER BY start_position;";
		return makePromise(query)
	},

	getGenes: function getGenes(chromosome_id, start_position) {
		let query = "SELECT  id, name, end_position FROM gene WHERE chromosome_id = " +
			        chromosome_id + " AND start_position = " + start_position +
			        " ORDER  BY start_position;"
		return makePromise(query);
	},

	getAllShortVariants: function getAllShortVariants(sample_id, chromosome_id) {
		let query = "SELECT id, start_position, end_position, reference_sequence," +
			"reference_read_count, variant_sequence, variant_read_count" +
			" FROM short_variant" +
			" WHERE sample_id = " + sample_id +
			"  AND chromosome_id = " + chromosome_id;
		return makePromise(query);
	}
}

