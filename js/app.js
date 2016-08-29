angular
    .module('coreApp', [
		'ui.router',
		'templates-app',
        '720kb.socialshare',
        //'slick',
		'ngSanitize',
        'perfect_scrollbar',
		//'ngAnimate',
		'LocalStorageModule',
		'common.config',
		'common.models',
		'common.services',
		'common.interceptors',
		'common.directives',
		'common.filters',
		'module.main',
		'module.products',
		'module.shoppingCart',
		'module.product',
		'module.category',
		'module.faq'
	])
    .config(function ($stateProvider, $urlRouterProvider, DEFAULT_URL_PAGE,
        localStorageServiceProvider, $httpProvider) {
        
        // Routing 
        $stateProvider
            .state('app', {
                abstract: true,
                url: '',
                views: {
                    'header': {
                        templateUrl: '../dev/app/modules/shoppingCart/shoppingCart.tpl.html',
                        controller: 'shoppingCartController as shoppingCartVm',
                    },
                    'footer': {
                        templateUrl: '../dev/app/modules/navigationCart/navigationCart.tpl.html',
                        controller: 'navigationCartController as navigationCartVm',
                    }
                },
                resolve: {
                    InitCurrency: function (currencyService) {
                        return currencyService.initCurrencies();
                    },
                    InitProducts: function (productService) {
                        return productService.initAllProducts();
                    },
                }
            })
            .state('app.faq', {
                url: '/faq',
                views: {
                    'container@': {
                        templateUrl: '../dev/app/modules/faq/faq.tpl.html',
                        controller: 'faqController as faqVm'
                    }
                }
            })
            .state('app.shop', {
                url: '/shop/{showCase}',
                views: {
                    'container@': {
                        templateUrl: '../dev/app/modules/products/products.tpl.html',
                        controller: 'productsController as productsVm'
                    }
                }
            })
            .state('app.shop.category', {
                url: '/category/{categoryId}',
                views: {
                    'container@': {
                        templateUrl: '../dev/app/modules/category/category.tpl.html',
                        controller: 'categoryController as categoryVm'
                    }
                }
            })
            .state('app.shop.category.product', {
                url: '/product/{productId}',
                views: {
                    'container@': {
                        templateUrl: '../dev/app/modules/product/product.tpl.html',
                        controller: 'productController as productVm'
                    }
                },
            });

    
        if(nuskin.summerPromo.ended){
            $urlRouterProvider.otherwise(function ($injector) {
                var $state = $injector.get('$state');
                $state.go('app.shop', {'showCase': 'normal'});
            });
        }else{
            //default redirect to welcome page
            $urlRouterProvider.otherwise(DEFAULT_URL_PAGE);
        }

        //register interceptors
        $httpProvider.interceptors.push('spinnerInterceptor');
    
        //remove default prefix
        localStorageServiceProvider.setPrefix('');
    })
    .run(function ($rootScope, $location, $state, $timeout, ROUTING_TIMEOUT, $anchorScroll, EVENT_NAMES) {
    
    
        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState) {

            $anchorScroll(0);
            // toState.name === "app.shop.category.product" &&
            /*
            if (!$rootScope.forceRedirect) {
                e.preventDefault();
                clearStage();
                $timeout(function () {
                    $rootScope.forceRedirect = true;
                    $state.go(toState, toParams);
                }, 600);
            } else {
                $rootScope.forceRedirect = false;
            }
            */
        });
    });
angular.module('common.directives', []);
angular.module('common.filters', []);
angular.module('common.interceptors', []);
angular.module('common.models', []);
angular.module('common.services', []);
angular.module('module.category', []);
angular.module('module.faq', []);

angular.module('module.main',[]);

angular.module('module.navigationCart', []);
angular.module('module.product', []);
angular.module('module.products', []);
angular.module('module.shoppingCart', []);
function categoryController(categoryService, productService, $stateParams, shoppingCartService, $state) {
    var categoryVm = {};

    categoryVm.goToProduct = function (product) {
        $state.go('app.shop.category.product', {
            productId: product.sku,
            categoryId: product.categoryId
        });
    }

    categoryVm.closeMenus = function (product) {
        categoryVm.products.forEach(function (el, index) {
            if (el !== product) el.menuOpened = false;
        });
    }

    categoryVm.category = categoryService.getCategory($stateParams.categoryId);
    categoryVm.products = productService.getProductForCategory($stateParams.categoryId);


    return categoryVm;
};

angular
    .module('module.category')
    .controller('categoryController', categoryController)
    .directive('categoryRepeatDirective', function () {
        return function (scope, element, attrs) {

            TweenMax.fromTo(element, 0.5, {
                opacity: 0,
                //x: -100
            }, {
                opacity: 1,
                //x: 0,
                delay: scope.$index * 0.05
            });


        };
    })
    .directive('categoryDirective', function () {
        return function (scope, element, attrs) {

            var $desc = element.find('.ritual-description');
            TweenMax.fromTo($desc, 0.5, {
                autoAlpha: 0,
            }, {
                autoAlpha: 1,
                delay: 0.55
            });

            setTimeout(function () {
                $desc.perfectScrollbar('update');
            }, 0)

        };
    })
function faqController(faqService) {
	var faqVm = {};

	faqVm.questions = faqService.getQuestions();

	return faqVm;
};

angular
	.module('module.faq')
	.controller('faqController', faqController);

function MainCtrl($state, categoryService, $window, $stateParams,
    ROUTING_SHOP_STATE, $scope, shoppingCartService, $rootScope,
    EVENT_NAMES, $state, identityService, productService) {
    var mainVm = this;

    function redirectIfNoAccess() {
        if ($stateParams.showCase == ROUTING_SHOP_STATE.promo && shoppingCartService.getTotalUniqueProduct() < 3) {
            $state.go('app.shop', {
                showCase: ROUTING_SHOP_STATE.normal
            })
        }
    }

    $rootScope.translations = identityService.getTranslations();


    //local function
    mainVm.goBack = function () {
        //$window.history.back();
    }
    mainVm.ROUTING_SHOP_STATE = ROUTING_SHOP_STATE;
    mainVm.$state = $state;
    mainVm.ended = nuskin.summerPromo.ended;
    mainVm.$stateParams = $stateParams;
    mainVm.productActive = $stateParams.productId;
    mainVm.categoryActive = $stateParams.categoryId;
    mainVm.cartSrv = shoppingCartService;
    mainVm.canBuyPromoProducts = shoppingCartService.canBuyPromoProducts();
    mainVm.cartErrorMessage = shoppingCartService.getErrorFromCheckout();
    mainVm.productService = productService;
    mainVm.closePromoInformationPopup = function () {
        //identityService.closePromoInformationPopup();
        mainVm.hasClosedPromoInformationPopup = true; //identityService.hasClosedPromoInformationPopup();
    }
    mainVm.hasClosedPromoInformationPopup = false; //identityService.hasClosedPromoInformationPopup();
    // n means new, o means old (new is a reserved word for javascript => execution error)
    $scope.$watch('mainVm.$stateParams.showCase', function (n, o) {
        if (n) {
            //redirectIfNoAccess();
            if (n == ROUTING_SHOP_STATE.promo) {
                $rootScope.bodylayout = 'promo-layout';
                mainVm.categories = categoryService.getPromoCategories();
            } else {
                $rootScope.bodylayout = 'normal-layout';
                mainVm.categories = categoryService.getNormalCategories();
            }
        }
    });

    $scope.$watch('mainVm.$stateParams.categoryId', function (n, o) {


        mainVm.categoryActive = $stateParams.categoryId;

        TweenMax.to($('#site-title'), 0.5, {
            opacity: 0,
            scale: 1.1,
            onComplete: function () {

                if (mainVm.categoryActive == undefined) {
                    mainVm.siteTitle = $rootScope.translations.common.siteTitle;
                } else {
                    var cat = categoryService.getCategory(mainVm.categoryActive);
                    mainVm.siteTitle = cat.name;
                }

                $scope.$apply(function () {

                    TweenMax.fromTo($('#site-title'), 0.5, {
                        opacity: 0,
                        scale: 0.8,
                    }, {
                        opacity: 1,
                        scale: 1,
                        clearProps: "transform"
                    });

                });

            }
        });


    });

    $rootScope.$on(EVENT_NAMES.shoppingCartUpdated, function () {
        //redirectIfNoAccess();
        mainVm.canBuyPromoProducts = shoppingCartService.canBuyPromoProducts();
    });

    return mainVm;
}

angular
    .module('module.main')
    .controller('mainController', MainCtrl);
function navigationCartController(shoppingCartService, $rootScope, EVENT_NAMES, DEFAULT_IMAGE_URL, $state) {

    var navigationCartVm = {
        products: [],
        placeholders: [],
        regularProductsLength: 0,
        socialVisible: false,
    };


    navigationCartVm.$state = $state;

    var Placeholder = function (nb) {
        return {
            number: nb,
            urlImage: DEFAULT_IMAGE_URL
        }
    }

    navigationCartVm.socialToggle = function () {
        navigationCartVm.socialVisible = !navigationCartVm.socialVisible;
    }

    function initPlaceholders(products) {
        var placeholders = [];
        if (products.length < 3) {
            if (products.length < 1)
                placeholders.push(new Placeholder(1));
            if (products.length < 2)
                placeholders.push(new Placeholder(2));
            if (products.length < 3)
                placeholders.push(new Placeholder(3));
        }

        return placeholders;
    }

    function updatePlaceholders(placeholders, productsLength) {

        if (placeholders.length > 3 - productsLength) placeholders.splice(0, 1);

        if (productsLength < 3) {
            if (productsLength < 3 && placeholders.length < 1)
                placeholders.unshift(new Placeholder(3));
            if (productsLength < 2 && placeholders.length < 2)
                placeholders.unshift(new Placeholder(2));
            if (productsLength < 1 && placeholders.length < 3)
                placeholders.unshift(new Placeholder(1));
        }

        return placeholders;
    }

    navigationCartVm.goToProduct = function (product) {
        $state.go('app.shop.category.product', {
            productId: product.sku,
            categoryId: product.categoryId
        });
    }

    navigationCartVm.cartSrv = shoppingCartService;
    navigationCartVm.products = shoppingCartService.getProducts();
    navigationCartVm.placeholders = initPlaceholders(navigationCartVm.products);


    $rootScope.$on(EVENT_NAMES.shoppingCartUpdated, function () {
        var _tempArray = shoppingCartService.getProducts();
        navigationCartVm.placeholders = updatePlaceholders(navigationCartVm.placeholders, _tempArray.length);
        navigationCartVm.products = _tempArray;
        navigationCartVm.regularProductsLength = shoppingCartService.getTotalRegularProduct();

        var oldCartLength = $carousel.find('.box').length;

        setTimeout(function () {
            var newCartLength = $carousel.find('.box').length;
            var deltaCartLength = newCartLength - oldCartLength;

            var $carouselInnerWidth = 100 * $carousel.find('.box').length;
            $carouselInner.width($carouselInnerWidth + 100);

            var currentScrollIndex = Math.round($carousel.scrollLeft() / 100);
            //if (currentScrollIndex-- <= 0) {
            //    currentScrollIndex = $carousel.find('.box').length - 3;
            //}


            if (deltaCartLength > 0) {
                currentScrollIndex++;
            } else if (deltaCartLength < 0) {
                currentScrollIndex--;
            }

            $carousel.stop().scrollLeft(currentScrollIndex * 100);

        }, 0);

    });
    navigationCartVm.redirectToCheckout = shoppingCartService.checkout;
    navigationCartVm.regularProductsLength = shoppingCartService.getTotalRegularProduct();


    var $carousel = $('#cart-overview .cart-carousel'),
        $carouselInner = $carousel.find('.inner');

    setTimeout(function () {
        var $carouselInnerWidth = 100 * $carousel.find('.box').length;
        $carouselInner.width($carouselInnerWidth + 100);
        $carousel.scrollLeft($carouselInnerWidth - $carousel.width());
    }, 0);

    navigationCartVm.carouselPrev = function () {
        var currentScrollIndex = Math.round($carousel.scrollLeft() / 100);
        if (currentScrollIndex-- <= 0) {
            currentScrollIndex = $carousel.find('.box').length - 3;
        }
        $carousel.stop().animate({
            scrollLeft: currentScrollIndex * 100
        }, 750);
    }

    navigationCartVm.carouselNext = function () {
        var currentScrollIndex = Math.round($carousel.scrollLeft() / 100);
        if (currentScrollIndex++ >= $carousel.find('.box').length - 3) {
            currentScrollIndex = 0;
        }
        $carousel.stop().animate({
            scrollLeft: currentScrollIndex * 100
        }, 750);
    }

    return navigationCartVm;
};

angular
    .module('module.shoppingCart')
    .controller('navigationCartController', navigationCartController)
function productController(productService, $stateParams, shoppingCartService, $state) {

    var productVm = {
        products: []
    };
    productVm.closeMenus = function (product) {
        productVm.products.forEach(function (el, index) {
            if (el !== product) el.menuOpened = false;
        });
    }
    productVm.closeToolTip = function () {
        $('.quick-buy-tooltip').hide();
    }
    productVm.showToolTip = function () {
        $('.quick-buy-tooltip').show();
    }

    productVm.goToProduct = function (product) {
        //productVm.products = [];
        $state.go('app.shop.category.product', {
            productId: product.sku,
            categoryId: product.categoryId
        });
    }

    productVm.products = productService.getProductsFromSameCategory($stateParams.productId);


    productVm.cartSrv = shoppingCartService;
    productVm.showLongDecription = false;
    productVm.displayLongDecription = function () {
        productVm.showLongDecription = !productVm.showLongDecription;
    }

    setTimeout(function () {
        $('.product-description').perfectScrollbar('update');
    }, 0)

    return productVm;
};

angular
    .module('module.product')
    .controller('productController', productController)
    .directive('productRepeatDirective', function () {
        return function (scope, element, attrs) {

            TweenMax.fromTo(element, 0.5, {
                opacity: 0,
                x: -100
            }, {
                opacity: 1,
                x: 0,
                delay: scope.$index * 0.05
            });

        };
    })
function productsController(productService, $stateParams, ROUTING_SHOP_STATE, $state, shoppingCartService) {
    var productsVm = {
        products: [],
        activeCategory: '',
    }

    var _tempProducts;
    if ($stateParams.showCase == ROUTING_SHOP_STATE.promo) {
        productsVm.products = productService.getPromoProducts();
    } else {
        productsVm.products = productService.getNormalProducts();
    }

    productsVm.cartSrv = shoppingCartService;

    productsVm.closeMenus = function (product) {
        productsVm.products.forEach(function (el, index) {
            if (el !== product) el.menuOpened = false;
        });
    }

    productsVm.goToProduct = function (product) {
        //productsVm.products = [];
        $state.go('app.shop.category.product', {
            productId: product.sku,
            categoryId: product.categoryId
        });
    }

    productsVm.goToProductCategory = function (product) {
        //productsVm.products = [];
        $state.go('app.shop.category.product', {
            productId: product.sku,
            categoryId: product.categoryId
        });
    }

    productsVm.setActiveCategory = function (category) {
        productsVm.activeCategory = category;
    }


    return productsVm;
};

angular
    .module('module.products')
    .controller('productsController', productsController)
    .directive('productsRepeatDirective', function () {
        return function (scope, element, attrs) {
            if (scope.$index < 4 || scope.$index == 5) {
                TweenMax.fromTo(element, 0.5, {
                    opacity: 0,
                    x: -100
                }, {
                    opacity: 1,
                    x: 0,
                    delay: scope.$index * 0.05
                });
            } else {
                TweenMax.fromTo(element, 0.5, {
                    opacity: 0,
                    x: 100
                }, {
                    opacity: 1,
                    x: 0,
                    delay: scope.$index * 0.05
                });

            }

        };
    })
function shoppingCartController(shoppingCartService, $rootScope,
    EVENT_NAMES, $window, CHECKOUT_URL) {

    var shoppingCartVm = {
        regularProductsLength: 0,
    };

    function initVm() {
        shoppingCartVm.totalQuantity = shoppingCartService.getTotalQuantity();
        shoppingCartVm.products = shoppingCartService.getProducts();
        shoppingCartVm.canCheckout = shoppingCartService.canCheckout();
        shoppingCartVm.totalPrice = shoppingCartService.getTotalPrice();
        shoppingCartVm.totalPSV = shoppingCartService.getTotalPSV();
        shoppingCartVm.totalDiscountPrice = shoppingCartService.getTotalDiscountPrice();
    }

    shoppingCartVm.cartSrv = shoppingCartService;
    //shoppingCartVm.showCart = false;
    shoppingCartVm.redirectToCheckout = shoppingCartService.checkout;
    shoppingCartVm.displayCart = shoppingCartService.displayCart;
    shoppingCartVm.cartErrorMessage = shoppingCartService.getErrorFromCheckout();

    shoppingCartVm.toggleMobileMenu = function () {
        $('#summer-app-body').toggleClass('mobile-menu-display');
    }
    initVm();

    $rootScope.$on(EVENT_NAMES.shoppingCartUpdated, function () {
        initVm();
        shoppingCartVm.regularProductsLength = shoppingCartService.getTotalRegularProduct();
    });
    shoppingCartVm.regularProductsLength = shoppingCartService.getTotalRegularProduct();

    return shoppingCartVm;
};

angular
    .module('module.shoppingCart')
    .controller('shoppingCartController', shoppingCartController);
function categoryService(categoryModel, PROMO_PRODUCTS_KEY) {
    var api = {};

    function formatCategory(category) {
        return categoryModel.convertTo(
            category.key,
            category.name,
            category.title,
            category.description);
    }

    function formatCategories(list) {
        var result = [];

        for (var i = 0; i < list.length; i++) {
            var category = list[i];
            result.push(
                formatCategory(category)
            )
        }

        return result;
    }

    // categories
    api.getNormalCategories = function () {
        var list = _.filter(nuskin.summerPromo.categories.data, function (c) {
            return c.key != PROMO_PRODUCTS_KEY;
        });
        return formatCategories(list);
    };

    api.getPromoCategories = function () {
        var list = _.filter(nuskin.summerPromo.categories.data, function (c) {
            return c.key == PROMO_PRODUCTS_KEY;
        });
        return formatCategories(list);
    };

    api.getCategory = function (key) {
        var category = _.find(nuskin.summerPromo.categories.data, function (c) {
            return c.key == key;
        });
        return formatCategory(category);
    }

    return api;
}

angular
    .module('common.services')
    .service('categoryService', categoryService);
function currencyService(CURRENCY_WEBSERVICE_URL, $http, identityService) {
	var api = {};
	var currency = {};

	function number_format(number, decimals, dec_point, thousands_sep) {
		number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
		var n = !isFinite(+number) ? 0 : +number,
			prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
			sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
			dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
			s = '',
			toFixedFix = function(n, prec) {
				var k = Math.pow(10, prec)
				return '' + (Math.round(n * k) / k)
					.toFixed(prec)
			}
			// Fix for IE parseFloat(0.55).toFixed(0) = 0;
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
			.split('.')
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
		}
		if ((s[1] || '')
			.length < prec) {
			s[1] = s[1] || ''
			s[1] += new Array(prec - s[1].length + 1)
				.join('0')
		}
		return s.join(dec)
	}

	api.currencyFormat = function(amount) {
		var price = number_format(amount, currency.accuracy, currency.decimal, currency.delimiter);
		return (currency.after == 'true') ? price + currency.symbol : currency.symbol + price;
	}

	api.initCurrencies = function() {
		var countryCode = identityService.getCountryCode();
		return $http.get(CURRENCY_WEBSERVICE_URL).then(function(response) {
			currency = _.find(response.data, function(line) {
				return line.id == countryCode;
			});

			return response;
		});
	}

	return api;
}

angular
	.module('common.services')
	.service('currencyService', currencyService);
function faqService() {
	var api = {};

	api.getQuestions = function() {
		return nuskin.summerPromo.faq;
	}

	return api;
}

angular
	.module('common.services')
	.service('faqService', faqService);

function identityService(LOCAL_STORAGE_KEYS, localStorageService) {
	var api = {};

	api.getCountryCode = function() {
		return nuskin.util.countryCode;
	}

	api.getLanguageCode = function() {
		return nuskin.util.languageCode;
	}

	api.getTranslations = function() {
		return nuskin.summerPromo.translations;
	}

	api.getUserType = function() {
		return userType;
	}

	api.hasClosedPromoInformationPopup = function() {
		return localStorageService.get(LOCAL_STORAGE_KEYS.hasClosedPromoInformationPopup);
	}

	api.closePromoInformationPopup = function() {
		localStorageService.set(LOCAL_STORAGE_KEYS.hasClosedPromoInformationPopup, true);
	}

	return api;
}

angular
	.module('common.services')
	.service('identityService', identityService);

function productService($http, identityService, productModel,
    PRODUCT_WEBSERVICE_URL_TEMPLATE, $q,
    ROUTING_SHOP_STATE, PROMO_PRODUCTS_KEY, categoryService, USER_TYPES, shoppingCartService) {

    var api = {
        isInPresales: false,
    };
    var productsCache = {};

    // utilities
    function lightWeightProductsFormat(products, categoryKey) {

        var result = [];
        for (var i = 0; i < products.length; i++) {

            var product = _.find(productsCache, function (p) {
                return p.sku == products[i].sku;
            });

            product.menuOpened = false;
            result.push(
                product
            )
        }
        return result;
    }

    function getProductsForCategories(categories) {
        var products = [];
        for (var i = 0; i < categories.length; i++) {
            var category = _.find(nuskin.summerPromo.categories.items, function (c) {
                return c.key == categories[i].key
            });
            products = products.concat(
                lightWeightProductsFormat(category.products, category.key)
            );
        }
        return products;
    }

    function getCategoryForProduct(sku) {
        var category = _.find(nuskin.summerPromo.categories.items, function (c) {
            return _.any(c.products, function (p) {
                return p.sku == sku
            });
        });
        return category;
    }

    function getProductRawData(sku) {

        var languageCode = identityService.getLanguageCode();
        var countryCode = identityService.getCountryCode();
        var product = {};

        var productWebserviceUrl = PRODUCT_WEBSERVICE_URL_TEMPLATE.format(
            sku.substr(0, 2),
            sku.substr(2, 2),
            sku.substr(4, 2),
            sku,
            languageCode,
            countryCode
        )

        return $http.get(productWebserviceUrl).then(function (response) {
            if (response && response.data) {
                return response.data;
            }
            return product;
        });
    }

    // products
    api.getSelectedProduct = function () {
        return getProductsForCategories(categories);
    }
    api.getNormalProducts = function () {
        var categories = categoryService.getNormalCategories();
        return getProductsForCategories(categories);
    }

    api.getPromoProducts = function () {
        var categories = categoryService.getPromoCategories();
        return getProductsForCategories(categories);
    }

    api.getProductForCategory = function (categoryKey) {
        var category = _.find(nuskin.summerPromo.categories.items, function (c) {
            return c.key == categoryKey;
        });
        return category ? lightWeightProductsFormat(category.products, category.key) : null;
    }

    api.getProductsFromSameCategory = function (sku) {
        var category = getCategoryForProduct(sku);
        var products = [];
        for (var i = 0; i < category.products.length; i++) {
            var product = _.find(productsCache, function (p) {
                return p.sku == category.products[i].sku;
            });
            product.menuOpened = false;
            product.selected = product.sku == sku;
            if (product.selected) api.isInPresales = (product.selected && product.isInPresales);
            products.push(
                product
            );
        }
        return products;
    }


    api.initAllProducts = function () {
        
        var allProducts = [];
        var products = _.chain(nuskin.summerPromo.categories.items)
            .pluck('products')
            .flatten(true)
            .value();
        
            

        for (var i = 0; i < products.length; i++) {
            var product = products[i];
            product.menuOpened = false;
            
            if(nuskin.summerPromo.ended){

                allProducts.push(
                    productModel.convertTo(product.sku, false, false, null, null, null, false, false, null)
                )
            }else{
                allProducts.push(
                    api.getProduct(product.sku, product.isOutOfStock, product.isInPresales)
                )
            }
        }
        return $q.all(allProducts).then(function (data) {
            productsCache = data;
            shoppingCartService.updateCart(data);
            return data;
        }, function (err) {
            return err;
        })
    }

    api.getProduct = function (sku, isOutOfStock, isInPresales) {
        return getProductRawData(sku).then(function (rawData) {
            var product = {};
            var userType = identityService.getUserType();

            var category = getCategoryForProduct(rawData.sku);
            product = productModel.convertTo(
                rawData.sku,
                category ? category.key : null,
                rawData.contents.language[0].shortDescription,
                rawData.contents.language[0].longDescription,
                rawData.contents.language[0].name, {
                    fullPrice: userType == USER_TYPES.CUSTOMERS || userType == USER_TYPES.NOT_LOGGED_IN ? rawData.market.Retail : rawData.market.Wholesale,
                    priceReduced: userType == USER_TYPES.CUSTOMERS || userType == USER_TYPES.NOT_LOGGED_IN ? rawData.market.WebRetail : rawData.market.WebWholesale,
                    psv: userType == USER_TYPES.DISTRIBUTORS ? rawData.populateWholesalePricing.psvValue : null
                },
                isOutOfStock,
                isInPresales,
                rawData.contents.fullImage
            )

            return product;
        });
    }

    return api;
}

angular
    .module('common.services')
    .service('productService', productService, ['identityService', identityService]);
function ShoppingCartService($rootScope, identityService, EVENT_NAMES, localStorageService,
    LOCAL_STORAGE_KEYS, PROMO_PRODUCTS_KEY, $window,
    CHECKOUT_URL) {
    var api = {}

    api.showCart = false;

    var cart = localStorageService.get(LOCAL_STORAGE_KEYS.shoppingCartForWebApp) || {
        products: []
    };

    function transformShoppingCart() {
        var result = {
            categoryProducts: [],
            promoProducts: []
        }

        for (var i = 0; i < cart.products.length; i++) {
            var product = cart.products[i];
            if (product.categoryId == PROMO_PRODUCTS_KEY) {
                result.promoProducts.push({
                    sku: product.sku,
                    quantity: product.quantity
                });
            } else {
                result.categoryProducts.push({
                    sku: product.sku,
                    quantity: product.quantity
                });
            }
        }

        return result;
    }

    $rootScope.$on(EVENT_NAMES.shoppingCartUpdated, function () {
        localStorageService.set(LOCAL_STORAGE_KEYS.shoppingCartForWebApp, cart);
        localStorageService.set(LOCAL_STORAGE_KEYS.shoppingCartForNuskin, transformShoppingCart());
    });

    api.getProducts = function () {
        return cart.products;
    }
    api.displayCart = function () {
        api.showCart = !api.showCart;
    }

    api.cleanUpCart = function () {

        var skus = _.chain(nuskin.summerPromo.categories.items)
            .pluck('products')
            .flatten(true)
            .pluck('sku')
            .flatten(true)
            .value();

        cart.products = _(cart.products).filter(function (item) {
            return $.inArray(item.sku, skus) !== -1;
        });

        $rootScope.$broadcast(EVENT_NAMES.shoppingCartUpdated);

    };

    api.updateCart = function (products) {

        angular.forEach(cart.products, function (item, key) {

            var product = _(products).find(function (_product) {
                return _product.sku == item.sku;
            });

            var quantity = item.quantity;
            cart.products[key] = angular.copy(product);
            cart.products[key].quantity = quantity;

        });


        $rootScope.$broadcast(EVENT_NAMES.shoppingCartUpdated);

    };

    api.resetCart = function () {
        cart.products = [];
    };

    api.getTotalUniqueProduct = function () {
        return cart.products.length;
    }
    api.getTotalRegularProduct = function () {

        var regularProducts = _.filter(cart.products, function (p) {
            return !p.isPromo
        });

        return regularProducts.length;
    }

    api.getTotalQuantity = function () {
        var totalProducts = 0;
        if (cart.products) {
            for (var i = 0; i < cart.products.length; i++) {
                totalProducts += cart.products[i].quantity;
            }
        }
        return totalProducts;
    };

    api.hasProducts = function () {
        return cart.products && cart.products.length > 0;
    };

    api.addProduct = function (product) {
        var productCart = _.find(cart.products, function (p) {
            return p.sku == product.sku;
        });

        if (!productCart) {
            var productToAdd = angular.copy(product);
            cart.products.push(productToAdd);
        } else {
            productCart.quantity += product.quantity;
        }
        $rootScope.$broadcast(EVENT_NAMES.shoppingCartUpdated);
    };

    api.removeProduct = function (product) {
        var skuList = _.pluck(cart.products, "sku");
        var indexProductToRemove = _.indexOf(skuList, product.sku);

        if (indexProductToRemove != -1) {
            cart.products.splice(indexProductToRemove, 1);
            //            var productsToRemove = _.filter(cart.products, function (p) {
            //                return p.categoryId == PROMO_PRODUCTS_KEY
            //            });
            //            if (productsToRemove) {
            //                for (var i = 0; i < productsToRemove.length; i++) {
            //                    skuList = _.pluck(cart.products, "sku");
            //                    indexProductToRemove = _.indexOf(skuList, productsToRemove[i].sku);
            //                    cart.products.splice(indexProductToRemove, 1);
            //                }
            //            }

            $rootScope.$broadcast(EVENT_NAMES.shoppingCartUpdated);
        }
    };

    api.incrementQuantityOfProduct = function (product) {
        var productCart = _.find(cart.products, function (p) {
            return p.sku == product.sku;
        });
        if (productCart != null) {
            productCart.quantity++;
            $rootScope.$broadcast(EVENT_NAMES.shoppingCartUpdated);
        }
    };

    api.decrementQuantityOfProduct = function (product) {
        var productCart = _.find(cart.products, function (p) {
            return p.sku == product.sku;
        });
        if (productCart != null) {
            if ((productCart.quantity - 1) > 0) {
                productCart.quantity--;
                $rootScope.$broadcast(EVENT_NAMES.shoppingCartUpdated);
            }
        }
    };

    api.getTotalPrice = function () {
        var totalPrice = 0;
        if (cart.products) {
            for (var i = 0; i < cart.products.length; i++) {
                if (!isNaN(cart.products[i].price)) {
                    totalPrice += cart.products[i].quantity * cart.products[i].price;
                }
            }
        }
        return totalPrice;
    };

    api.getTotalDiscountPrice = function () {
        var totalPrice = 0;
        var tempPrice;
        if (cart.products) {
            for (var i = 0; i < cart.products.length; i++) {
                tempPrice = (cart.products[i].isPromo ? cart.products[i].price : cart.products[i].priceReduced);
                if (!isNaN(tempPrice)) {
                    totalPrice += cart.products[i].quantity * tempPrice;
                }
            }
        }
        return totalPrice;
    };

    api.getTotalPSV = function () {
        var totalPSV = 0;
        if (cart.products) {
            for (var i = 0; i < cart.products.length; i++) {
                totalPSV += cart.products[i].quantity * (cart.products[i].isPromo ? 0 : cart.products[i].psv);
            }
        }
        return totalPSV;
    };

    api.checkout = function () {
        var userType = identityService.getUserType();
        if (userType == "NotLoggedIn") {
            $window.showLoginPopup();
        } else {
            $window.location.href = CHECKOUT_URL;
        }
    }

    api.addAndCheckout = function (product) {
        api.resetCart();
        api.addProduct(product);
        api.checkout();
    }

    api.canBuyPromoProducts = function () {
        return api.getTotalRegularProduct() > 2;
    };

    api.canCheckout = function () {
        return api.getTotalRegularProduct() > 2;
    };

    api.getErrorFromCheckout = function () {

        var nuskinCart = localStorageService.get(LOCAL_STORAGE_KEYS.shoppingCartForNuskin) || {};
        return {
            hasError: nuskinCart.errorMsg != undefined && cart.errorMsg != '',
            message: nuskinCart.errorMsg,
            products: nuskinCart.productsOutOfStock
        };
    }

    var errorMessages = api.getErrorFromCheckout();
    if (errorMessages.hasError) api.showCart = true;
    api.cleanUpCart();

    return api;
};

angular
    .module('common.services')
    .service('shoppingCartService', ShoppingCartService);
function categoryModel(IMAGES_URL) {
    var api = {};

    function Category(key, name, title, description) {
        var category = {
            key: key,
            name: name,
            title: title,
            description: description
        }

        return category;
    }

    api.convertTo = function (key, name, title, description) {
        return new Category(key, name, title, description)
    }

    return api;
}

angular
    .module('common.models')
    .service('categoryModel', categoryModel);
function productModel(IMAGES_URL, PROMO_PRODUCTS_KEY) {
    var api = {};

    function Product(sku, categoryId, shortDescription, longDescription, name, priceData, isOutOfStock, isInPresales, fullImage) {

        var imagePathArray = fullImage.split('/');

        var imageSizeArray = imagePathArray[8].split('.');
        imageSizeArray[2] = "199";
        imageSizeArray[3] = "350";
        imagePathArray[8] = imageSizeArray.join('.');
        var fullImagePath = imagePathArray.join('/');


        var thumbnailSizeArray = imagePathArray[8].split('.');
        thumbnailSizeArray[2] = "130";
        thumbnailSizeArray[3] = "228";
        imagePathArray[8] = thumbnailSizeArray.join('.');
        var thumbnailImagePath = imagePathArray.join('/');


        var product = {
            sku: sku,
            categoryId: categoryId,
            urlThumbnail: IMAGES_URL + thumbnailImagePath,
            urlImage: IMAGES_URL + fullImagePath,
            //urlThumbnail: thumbnailImagePath,
            //urlImage: fullImagePath,
            shortDescription: shortDescription,
            longDescription: longDescription,
            name: name,
            price: null,
            priceReduced: null,
            psv: null,
            reduction: 0,
            quantity: 1,
            selected: false,
            menuOpened: false,
            quickBuyToolTipOpened: false,
            isOutOfStock: isOutOfStock || false,
            isInPresales: isInPresales || false,
            incrementQuantity: function () {
                this.quantity++;
            },
            decrementQuantity: function () {
                if (this.quantity > 1)
                    this.quantity--;
            }
        }

        if (priceData) {
            var reduction = Math.round(
                100 - (
                    (priceData.priceReduced / priceData.fullPrice) * 100
                )
            );
            product.reduction = reduction + ' %';
            product.price = priceData.fullPrice;
            product.priceReduced = priceData.priceReduced;
            product.psv = priceData.psv;
        }


        var skuIndex = _.chain(nuskin.summerPromo.categories.items)
            .pluck('products')
            .flatten(true)
            .pluck('sku')
            .indexOf(sku)
            .value();

        product.skuIndex = skuIndex;
        product.isPromo = categoryId == PROMO_PRODUCTS_KEY;

        return product;
    }


    api.convertTo = function (sku, categoryId, shortDescription, longDescription, name, price, isOutOfStock, isInPresales, fullImage) {
        return new Product(sku, categoryId, shortDescription, longDescription, name, price, isOutOfStock, isInPresales, fullImage)
    }

    return api;
}

angular
    .module('common.models')
    .service('productModel', productModel);
function spinnerInterceptor($rootScope, $q, EVENT_NAMES) {
	var numLoadings = 0;

	return {
		request: function(config) {

			numLoadings++;

			// Show loader
			$rootScope.$broadcast(EVENT_NAMES.loader_show);
			return config || $q.when(config);
		},
		response: function(response) {

			if ((--numLoadings) === 0) {
				// Hide loader
				$rootScope.$broadcast(EVENT_NAMES.loader_hide);
			}

			return response || $q.when(response);

		},
		responseError: function(response) {

			if (!(--numLoadings)) {
				// Hide loader
				$rootScope.$broadcast(EVENT_NAMES.loader_hide);
			}

			return $q.reject(response);
		}
	};
}

angular
	.module('common.interceptors')
	.factory('spinnerInterceptor', spinnerInterceptor);
function dynamicDirective($compile) {
	return {
		restrict: 'A',
		replace: true,
		link: function(scope, ele, attrs) {
			scope.$watch(attrs.dynamic, function(html) {
				ele.html(html);
				$compile(ele.contents())(scope);
			});
		}
	};
}

angular
	.module('common.directives')
	.directive("dynamic", dynamicDirective);

function spinnerDirective(EVENT_NAMES) {
    return function ($scope, element) {
        $scope.$on(EVENT_NAMES.loader_show, function () {
            element[0].style.display = "inline";
            return element;
        });
        return $scope.$on(EVENT_NAMES.loader_hide, function () {
            TweenMax.to(element, 1, {
                autoAlpha: 0,
            });
            return element;
        });
    };
}

angular
    .module('common.directives')
    .directive("spinnerLoader", spinnerDirective);
function customCurrency(currencyService) {
	return function(input) {
		return currencyService.currencyFormat(input);
	}
}

angular
	.module('common.filters')
	.filter('customCurrency', customCurrency);