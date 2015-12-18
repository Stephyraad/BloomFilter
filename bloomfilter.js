// Function BloomFilter Constructor
// Function Parameters:
//    -> n ~ number of items you expect to insert in the bitArray
//    -> p = false positive rate
var BloomFilter = function(n, p) {
	this.p = p;
  // max size of the Array
	this.max=  Math.floor( -n * Math.log(p) / (Math.log(2)^2) );
  // number of Hashing Functions
	this.k= Math.floor( this.max/n * Math.log(2) );
  //Array where to store the bits
  this.bitArray= [];
  // Array of returned indexes from Hashing Functions
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

  this.getIndexHashing = function(value, num) {
  var hash = num;
  for (var i = 0; i < value.length; i++) {
    hash = (hash<<5) + hash + value.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % this.max;
  };
};


// Method to set bitArray at location i to true
BloomFilter.prototype.add = function(value) {
  var num =0;

  for(var i=0; i< this.k; i++) {
    this.indexesArray[i] = this.getIndexHashing(value, num);
    num+=5000;
  }

	for(var i = 0; i< this.indexesArray.length; i++) {
		this.bitArray[this.indexesArray[i]] = 1;
	}
};

//Method to check if value at index is 1
BloomFilter.prototype.checkIndex = function(value) {
  var num =0;
  for(var i=0; i< this.k; i++) {
    this.indexesArray[i] = this.getIndexHashing(value, num);
    num+=5000;
  }

 for(var i = 0; i < this.indexesArray.length; i++) {
   if(this.bitArray[this.indexesArray[i]] === 0) {
     return false;
   }
 }
 return true;
};

// ---------------- Test -------------------
var bloomTest = new BloomFilter(10000, 0.001);

console.log("bloomTest ", bloomTest)
bloomTest.add("Hello World");
bloomTest.add("Hello Javascript");
console.log("Check ", bloomTest.checkIndex('Hello World'));
console.log("Check False ", bloomTest.checkIndex('Hello Cat'));
console.log("Check Two ", bloomTest.checkIndex("Hello Javascript"))

