<?php

namespace App\controller;

/**
 * Front Controller
 * S'occupe de charger les JS / CSS géné
 * S'occupe de charger le layout principal
 * S'occupe des traitements communs au site
 *
 * @author Thomas
 * @version 1.1.0
 * @todo : Amélioration chargement JSON avec Mise en cache (Memcached no mutualisé)
 */
class FrontController extends \Core\system\Page
{
    /**
     * Tableau d'infos du routeur
     * @var array
     */
    protected $routerInfos;

     /**
     * Modèle qui gére les métadonnées
     * @var \App\models\MetaPage
     */
    protected $modelMeta;

    /**
     * Init du controlleur
     *
     * @param  Array $router    Infos du routeur
     * @param Core\system\Environment $environment
     */
    public function __construct($router = null, \Core\system\Environment $environment)
    {
        //Appel du parent
        parent::__construct($environment);

        //Arguments Routeur
        $this->routerInfos = $router;

        //Modéle pour les métadonnées
        $this->modelMeta = new \App\models\MetaPage;

        //En attendant la version mobile, si on detecte que c'est un mobile on redirige vers la page d'accueil
        // Script aussi en JS
        $deviceDetect = $this->getDevice();

        /** CSS global à charger * */
        $this->loadAssetStyleLayout();

        /** JS global à charger * */
        $this->loadAssetScriptLayout();

        /** Envoi des données géné au layout * */
        //on injecte les méta par défaut, pour les pages qui en ont pas de définit
        $this->setMetaLayout();

        //Data en plus
        $this->loadDataLayout();

        /** Envoi des données géné au layout  * */
        //data Template
        $this->loadDataTemplate();

        /** Layout à charger * */
        //si c'est un appel ajax, on ne charge pas le layout
        $requestAjax = $this->request->request->get('ajaxLoad');
        if ($requestAjax === null) {
            $this->view->setTemplate('layout.ms', 'layout');
        }
    }

    /**
     * Page d'erreur
     * si le routeur n'a pas trouvé de correspondance
     */
    public function errorPage()
    {   
        header("HTTP/1.0 404 Not Found");
        $this->view->setTemplate('404.ms', 'template');
    }

    /**
     * Permet de vider le cache des assets ou des templates
     *
     * @param str $type    1 => vide cache JS/CSS  - 2 => vide cache Template
     * @return str  Msg confirmant que tout c'est bien passé
     */
    public function clearCache($type)
    {
        if ($type == 1) { // CSS-JS
            $externFiles = new \Core\assets\Assets($this->environment, WORKENV);
            $externFiles->clearCache();
        } elseif ($type == 2) { // TEMPLATE
            $this->view->clearCache();
        }

        echo"Le cache a bien été vidé";
        exit();
    }

    /**
     * Données Meta injecté au layout
     * Injecté dans le layout
     *
     * @param   Array 	$dataPage Tableau ayant les mêmes clés pour altérer les métas selon la page
     * @return  Bool    True en cas de succés
     */
    protected function setMetaLayout($dataPage = array())
    {
        $metaGene = $this->modelMeta->mergeMetaPage($dataPage);
        $this->view->setData(array('metaContent' => $metaGene), 'layout');
    }

    /**
     * Set l'item du menu qui est en sélectionné
     * @param str $keySelect    Id du menu selectionné : profil / apropos / portfolio / contact
     */
    protected function setItemMenuSelect($keySelect)
    {
        $this->view->setData(['itemSelect' => [$keySelect => true]], 'layout');
    }

    /**
     * Données sur le device d'appel
     *
     * @return 	Array	Les variables
     */
    protected function getDevice()
    {
        $device = new \Mobile_Detect();

        $listeDevice = array(
            'isMobile' => $device->isMobile(),
            'isTablet' => $device->isTablet(),
        );

        return $listeDevice;
    }

    /**
     * Données générales pour les templates
     *
     * @return 	Array	Les variables
     */
    private function getDataLinkSocial()
    {
        $modelL = new \App\models\SocialLink;
        return $modelL->getData();
    }


    /**
     * Méthode qui est lancé avant le chargement du controller
     */
    protected function beforeExec()
    {
        /** Purge du cache via le GET : 1 => JS/CSS  - 2 => Template * */
        $reqVideCache = $this->request->query->get('clearCache');
        if ($reqVideCache !== null && is_numeric($reqVideCache)) {
            $this->clearCache($reqVideCache);
        }
    }

    /**
     * Chargement des données propre au layout
     */
    private function loadDataLayout()
    {
        $arrayLayout = array(
            'version' => TJ_VERSION,
            'device' => $this->getDevice()
        );

        //Mode de travail
        if (WORKENV == 'dev') {
            $arrayLayout['modeDev'] = true;
        } else {
            $arrayLayout['modeProd'] = true;
        }

        $this->view->setData($arrayLayout, 'layout');
        return true;
    }

    /**
     * Chargement des données propre au template
     */
    private function loadDataTemplate()
    {
        $arrayTemplate = array(
            'linkData' => $this->getDataLinkSocial(),
            'device' => $this->getDevice()
        );
        
        
        $this->view->setData($arrayTemplate, 'template');
        return true;
    }

    /**
     * Chargement des fichiers style pour le projet global
     */
    private function loadAssetStyleLayout()
    {
         $this->setCss(
            array(
            'vendor/normalize.css',
            'main.less'
            ), 'global'
        );

        return true;
    }

    /**
     * Chargement des fichiers script pour le projet global
     */
    private function loadAssetScriptLayout()
    {
        //En haut de page
        $this->setJs(
            array('vendor/modernizr-respond.min.js'), 'global', 'top'
        );

        //Package NPM, chargé en bas de page
        $this->setPackage(
            array(
            'mustache/mustache.js',
            'requirejs/require.js'
            ), 'global', 'bottom'
        );

        //En bas de page
        $this->setJs(
            array(
            'routeur.js',
            'routes.js',
            'frontController.js',
            ), 'global', 'bottom'
        );
    }
}
?>