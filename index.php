<?php
/**
 * Bootstrap Tomsjac
 *
 * Pour vider le cache ?clearCache=
 * 1 => JS/CSS  - 2 => Template
 *
 * @author Thomas
 * @version 1.1.0
 */
/*
 * ------------------------------------------------------
 * CONSTANTE : VARIABLES GLOBALES
 * ------------------------------------------------------
 */
define('TJ_VERSION', '1.1.0');       //Version du site
if ($_SERVER['HTTP_HOST'] == 'tomsjac.info'
    or $_SERVER['HTTP_HOST'] == 'www.tomsjac.info'
    or $_SERVER['HTTP_HOST'] == 'test.tomsjac.info') {
    define('WORKENV', 'prod');     //Mode Prod, en ligne / activation des caches
} else {
    define('WORKENV', 'dev');     //Mode dev
}

//Constante pour le routeur
define('CONTROLLERNAMESPACE', '\App\controller\\');
define('CONTROLLERDEFAULT', 'Accueil');
define('METHODEDEFAULT', 'index');

//Constante des paths du projet
define('PATHDATA', 'data/');
define('PATHCACHE', 'storage/');

define('PATHTEMPLATE', 'app/templates/');
define('PATHCACHETEMPLATE', PATHCACHE . 'mustache/');

define('PATHCSS', 'app/resources/style/');
define('PATHJS', 'app/resources/script/');
define('PATHPACKAGE', 'app/resources/packages/node_modules/');
define('PATHCACHEJSCSS', PATHCACHE . 'cacheJsCss/');
define('PATHWEBCACHEJSCSS', 'cacheJsCss/');

/*
 * ------------------------------------------------------
 * Autoload Class
 * ------------------------------------------------------
 */
// AutoLoad
require 'vendor/autoload.php';

/*
 * ------------------------------------------------------
 * Environment / Request
 * ------------------------------------------------------
 */
$environment  = new \Core\system\Environment();
$request      = $environment->getObjRequest();
/*
 * ------------------------------------------------------
 * Compilation à la volée des assets (js / css)
 * Appel direct depuis le Front (ex : requirejs)
 * /index.php?asset=1&type=asset&file=pathDufichier
 * ------------------------------------------------------
 */
if ($request->query->get('asset') !== null) {
    $assets = new \Core\assets\Assets($environment, WORKENV);
    $assets->setActiveListFile(true);

    $assetLoad = $request->query->get('file');
    $type      = $request->query->get('type');
    $ext       = pathinfo($assetLoad, PATHINFO_EXTENSION);

    if (in_array(strtolower($ext), ['js', 'min.js']) == true && $type == 'asset') {
        header('Content-type: application/javascript');
        $file = PATHJS.$assetLoad;
        echo $assets->compileJS($file, 'content');
    } else if (in_array(strtolower($ext), ['css', 'less', 'min.css']) == true && $type == 'asset') {
        header('Content-type: text/css');
        $file = PATHCSS.$assetLoad;
        echo $assets->compileJS($file, 'content');
    } else if ($type == 'package') {
        header('Content-type: application/javascript');
        $file = PATHPACKAGE.$assetLoad;
        echo $assets->compileJS($file, 'content');
    }
    exit();
} else {
    /*
     * ------------------------------------------------------
     * ROUTEUR
     * ------------------------------------------------------
     * Selon l'appel Get, on redirige vers la bonne méthode pour le traitement
     */
    $router = new \Core\system\Router($environment);
    $route  = $router->getRoute();
    //var_dump($route);

    /*
     * ------------------------------------------------------
     * Appel du controller
     * ------------------------------------------------------
     */
    $classRoute = new ReflectionClass($route['class']);
    $controller = $classRoute->newInstanceArgs(array($route, $environment));

    $methodRoute = new ReflectionMethod($controller, $route['method']);
    $methodRoute->invoke($controller);
    //$controller->{$route['method']}();

    /*
     * ------------------------------------------------------
     * Rendu de la page
     * ------------------------------------------------------
     */
    echo $controller->render();
}
?>