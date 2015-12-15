// Function BloomFilter Constructor

// Function Parameters max = vector size, k = number of hash functions, n ~ number of items you expect to insert in the bitArray, p = false positive rate
var BloomFilter = function(n, p) {
	this.p = p;
	this.max=  Math.floor( -n * Math.log(p) / (Math.log(2)^2) );
	this.k= Math.floor( this.max/n * Math.log(2) );
	this.bitArray= [];
	this.indexesArray = [];
	
	var defaults = {
		max: 100,
		k: 2
	};
	if (!this.max) { this.max = defaults.max; } 
    if (!this.k) { this.k = defaults.k; }

    // Populate bitArray with 0s
    for(var i =0; i< this.max; i++){
    	this.bitArray[i] = 0;
    }
};
// Hash Functions
var getIndexHashing = function(str, max) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

var getIndexHashingTwo = function(str, max) {
  var hash = 5500;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

// Method to find all indexes for the many hashing functions
BloomFilter.prototype.getIndex = function(value) {
	var hash1 = getIndexHashing(value, this.max);
	var hash2 = getIndexHashingTwo(value, this.max);

	this.indexesArray = [ hash1, hash2 ];
	return this.indexesArray;
};

// Method to set bitArray at location i to true
BloomFilter.prototype.add = function(value) {
	for(var i = 0; i< this.indexesArray.length; i++) {
		this.bitArray[this.indexesArray[i]] = 1;
	}
};

// Method to check if value at index is 1
BloomFilter.prototype.checkIndex = function(value) {
	var indexesArray = this.getIndex(value);

	for(var i = 0; i < indexesArray.length; i++) {
		if(this.bitArray[indexesArray[i]] === 0) {
			return false;
		}
	}
	return true;
};


 //----- TEST ----- //
var bloomVector = new BloomFilter(10000, 0.001);
bloomVector.getIndex('Hello World');
bloomVector.add("Hello World");
var check = bloomVector.checkIndex("Hello World");
console.log(check + " Prob rate: " + bloomVector.p + "%");


