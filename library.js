(function(window){
        function myLibrary(){
            var catalog = createRandomCatalog(100);
    
            return {
                searchProductById: searchProductById,
                searchProductsByPrice: searchProductsByPrice,
                searchProductsByType: searchProductsByType,
                searchAllProducts: searchAllProducts
            }
    
            // To create a product with random price and type
            // This will not be accessed from outside the library
            function createRandomObject(){
                var typeArray = ['Electronics','Book','Clothing','Food'];
                var price = (Math.random()*500).toFixed(2);
                var type = typeArray[Math.floor(Math.random()*4)];
                return {price:price, type:type};
            }

            // To create a catalog with random products
            // This will not be accessed from outside the library
            function createRandomCatalog(num){
                var catalog = [];
                for(var i=0;i<num;i++){
                    var product = createRandomObject();
                    catalog.push({id:i, price:product.price,type:product.type});
                }
                return catalog;
            }

            // Returns all the products in the catalog as an array
            function searchAllProducts(){
                var promise = new Promise(function(resolve, reject){
                    setTimeout(function(){resolve(catalog)},1000);
                });
                return promise;
            }

            // This function will return a promise which will resolve if
            // the id mathches any product in the catalog and will
            // reject otherwise.
            function searchProductById(id){
                var promise = new Promise(function(resolve, reject){
                    var i = 0;
                    setTimeout(function(){
                        while(i < catalog.length){
                            if(id == catalog[i].id){
                                resolve(catalog[i]);
                            }
                            i++;
                        }
                        reject("Invalid ID: "+id);
                    }, 1000);
                });
                return promise;
            }

            // This function will return a promise which will resolve with an array
            // containing all product having specified type and will reject if the
            // specified type is not found in possible types. The setTimeout 
            // function makes sure that the function executes with delay of 1000 ms
            function searchProductsByType(type){
                var promise = new Promise(function(resolve, reject){
                    var i = 0;
                    var typeArray = [];
                    var possibleTypes = ['Electronics','Book','Clothing','Food'];
                    if(!possibleTypes.includes(type)){
                        reject("Invalid type: "+type);
                    }
                    setTimeout(function(){
                        while(i < catalog.length){
                            if(type === catalog[i].type){
                                typeArray.push(catalog[i]);
                            }
                            i++;
                        }
                        resolve(typeArray);
                    }, 1000);                    
                });
                return promise;
            }

            // The function will return a promise which will resolve with
            // array of products with their prices in specified range else 
            // it will reject with the error message
            function searchProductsByPrice(price, difference){
                var promise = new Promise(function(resolve, reject){
                    var i = 0;
                    var priceArray = [];
                    if(!isFinite(price)){
                        reject("Not a valid price: " + price);
                    }
                    setTimeout(function(){
                        while(i < catalog.length){
                            if(Math.abs(price-catalog[i].price)<difference){
                                priceArray.push(catalog[i]);
                            }
                            i++;
                        }
                        resolve(priceArray);    
                    }, 1000);
                    
                }); 
                return promise;
            }    
    
        }
        if(typeof(window.api) === 'undefined'){
            window.api = myLibrary();
        }
    
    })(window);