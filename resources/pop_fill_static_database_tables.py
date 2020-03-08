#python2.7
import sqlite3

def createConnection(database_filename):
   connection = None
   try:
      connection = sqlite3.connect(database_filename)
   except:
      print "Oh no ):"
   return connection

database_filename = "/cygdrive/c/Users/Me/Documents/hackathon/2020-03-07/pop.sqlite"

chromosome_filename = "/cygdrive/c/Users/Me/Documents/hackathon/2020-03-07/Make it Pop!/Make it Pop!/Data Files/hg19_chromosome_sizes.tsv"

exon_filename = "/cygdrive/c/Users/Me/Documents/hackathon/2020-03-07/Make it Pop!/Make it Pop!/Data Files/hg19_exon_locations.tsv"

gene_filename = "/cygdrive/c/Users/Me/Documents/hackathon/2020-03-07/Make it Pop!/Make it Pop!/Data Files/hg19_genes.tsv"


connection = createConnection(database_filename)
cursor = connection.cursor()
with open(chromosome_filename, 'r') as chromosome_file:
   header = chromosome_file.readline()
   for line in chromosome_file:
     items = line.strip().split()
     name = items[0]
     size = items[1]
     query = "INSERT INTO chromosome (name, size) VALUES (?, ?);"
     _ = cursor.execute(query, [name, size])

connection.commit()

chromosome_dictionary = {} # {chromosome_name: chromosome_id}

cursor.execute("SELECT * FROM chromosome;")
for row in cursor.fetchall():
   chromosome_id = row[0]
   chromosome_name = row[1]
   chromosome_dictionary[chromosome_name] = chromosome_id

with open(exon_filename, 'r') as exon_file:
   for line in exon_file:
      items = line.strip().split()
      chromosome_name = items[0].split('_')[0]
      if chromosome_name not in chromosome_dictionary:
         continue
      chromosome_id = chromosome_dictionary[chromosome_name]
      start_position = int(items[1])
      end_position = int(items[2])
      query = "INSERT INTO exon (start_position, end_position, chromosome_id) VALUES (?, ?, ?);"
      _ = cursor.execute(query, [start_position, end_position, chromosome_id])

connection.commit()

with open(gene_filename, 'r') as gene_file:
   for line in gene_file:
      items = line.strip().split()
      chromosome_name = items[0]
      if chromosome_name not in chromosome_dictionary:
         continue
      chromosome_id = chromosome_dictionary[chromosome_name]
      start_position = int(items[1])
      end_position = int(items[2])
      name = items[3]
      query = "INSERT INTO gene (chromosome_id, name, start_position, end_position) VALUES (?, ?, ?, ?);"
      _ = cursor.execute(query, [chromosome_id, name, start_position, end_position])

connection.commit()
connection.close()