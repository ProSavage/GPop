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
	getAllChromosomes: function getAllChromosomes() {
		let query = "SELECT * FROM chromosome;";
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

