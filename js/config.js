var events = {
    /*
      Fired when the shopping cart is changed
    */
    'shoppingCartUpdated': 'shoppingCartUpdated',
    /*
    	Fired before each ajax call
    */
    'loader_show': 'loader_show',
    /*
    	Fired after each ajax call
    */
    'loader_hide': 'loader_hide'
}
var defaultUrlPage = '/shop/normal';
var productWebServiceUrlTemplate = 'http://test.nuskin.com/content/products/{0}/{1}/{2}/{3}/{4}.service.{5}.json'
var localStorageKeys = {
        shoppingCartForNuskin: 'summerPromoCart',
        shoppingCartForWebApp: 'shoppingCart',
        hasClosedPromoInformationPopup: 'hasClosedPromoInformationPopup'
    }
    /*
    	Id of category for exclusive products
    */
var promoProductsKey = 'promoProducts';
var routingShopState = {
    normal: 'normal',
    promo: 'promo'
};

var userTypes = {
    DISTRIBUTORS: '10',
    CUSTOMERS: '20',
    PREFERRED_CUSTOMERS: '30',
    NOT_LOGGED_IN: 'NotLoggedIn'
}

/*
	To adapt for release
*/
var app_version = '0.0.1';
var imagesUrl = 'http://test.nuskin.com';
var checkoutUrl = 'http://www.google.com';
var currencyWebServiceUrl = 'http://test.nuskin.com/content/configuration/currencies.jsons';
var defaultImageURL = '/assets/img/default.jpg';
var routingTimeout = 300;
var siteURL = 'http://localhost:9111/';


angular
    .module('common.config', [])
    .constant('APP_VERSION', app_version)
    .constant('EVENT_NAMES', events)
    .constant('DEFAULT_URL_PAGE', defaultUrlPage)
    .constant('PRODUCT_WEBSERVICE_URL_TEMPLATE', productWebServiceUrlTemplate)
    .constant('IMAGES_URL', imagesUrl)
    .constant('LOCAL_STORAGE_KEYS', localStorageKeys)
    .constant('ROUTING_SHOP_STATE', routingShopState)
    .constant('PROMO_PRODUCTS_KEY', promoProductsKey)
    .constant('CHECKOUT_URL', checkoutUrl)
    .constant('CURRENCY_WEBSERVICE_URL', currencyWebServiceUrl)
    .constant('DEFAULT_IMAGE_URL', defaultImageURL)
    .constant('USER_TYPES', userTypes)
    .constant('ROUTING_TIMEOUT', routingTimeout)
    .constant('SITE_URL', siteURL);