<?php

namespace Core\system;

/**
 * Front Controller System
 * Permet de coordonner tous les infos entre le controller, le modèle et le template
 *
 * @author Thomas
 * @version 1.1.0
 */
class Page
{
    /**
     * Objet request
     * @var \Symfony\Component\HttpFoundation\Request
     */
    protected $request;

    /**
     * Objet de l'environment
     * @var \Core\system\Environment
     */
    protected $environment;

    /**
     * Tableau des infos Server, traité
     * @var array
     */
    protected $infoServer;

    /**
     * Tableau des fichiers externes à charger
     * @var array
     */
    protected $tabAssetsFiles = array();

    /**
     * Instance du gestionnaire de template
     * @var object
     */
    protected $view;

    /**
     * Constructor
     * @param Core\system\Environment $environment
     */
    protected function __construct(\Core\system\Environment $environment)
    {
        //on récupére les infos Request
        $this->environment = $environment;
        $this->request     = $environment->getObjRequest();
        $this->infoServer  = $environment->getServer();

        //on init le moteur template
        $this->view = new \Core\template\View($this->infoServer);

        $this->beforeExec();
    }

    /**
     * Retourne le nom du controller
     * @return str
     */
    public function getNameController()
    {
        $nameModule = explode('\\', $this->routerInfos['class']);
        return $nameModule[2];
    }

    /**
     * Pour afficher le rendu de la page
     */
    public function render()
    {
        $this->afterExec();

        //on s'occupe du template
        $templateFile = $this->view->getTemplate('template');
        if ($templateFile != '' or $templateFile != null) {
            $this->view->setData(array('infosEnv' => $this->infoServer), 'template');
            $htmlTemplate = $this->view->render($templateFile, $this->view->getData('template'));
        }

        //on s'occupe du layout, si variable non vide et pas d'ajax
        $templateLayout = $this->view->getTemplate('layout');
        if (
            ($templateLayout != '' or $templateLayout != null)
        ) {
            // envoi du html template au layout
            if (isset($htmlTemplate)) {
                $this->view->setData(array('template' => $htmlTemplate), 'layout');
            }

            //Path file Load
            $this->view->setData(array('infosEnv' => $this->infoServer), 'layout');

            //on traite les Js et CSS
            $listAsset = $this->generateAssetForView();
            $this->view->setData(array('listAsset' => $listAsset), 'layout');

            //on transfere les données au template
            $htmlFinal = $this->view->render($templateLayout, $this->view->getData('layout'));
        } else {
            $htmlFinal = $htmlTemplate;
        }

        return $htmlFinal;
    }

    /**
     * Méthode appelée avant le chargement du controller
     */
    protected function beforeExec()
    {
        
    }

    /**
     * Méthode appelée après le chargement du controller
     */
    protected function afterExec()
    {
        
    }

    /**
     * Methode pour ajouter les Css souhaités
     *
     * @param array $array	Tableau contenant les css à charger
     * @param array $group		type de ressource (global / module / package)
     */
    protected function setStyle($array, $group = 'global')
    {
        array_walk($array, function(&$item) {
            $item = PATHCSS.$item;
        });
        return $this->addAsset($array, 'style', $group, 'top');
    }

    /**
     * Methode pour ajouter les JS souhaités
     *
     * @param array $array		Tableau contenant les js à charger
     * @param array $group		type de ressource (global / module)
     * @param array $location	position de chargement dans le code HTML (top / bottom)
     */
    protected function setScript($array, $group = 'global', $location = 'top')
    {
        array_walk($array, function(&$item) {
            $item = PATHJS.$item;
        });
        return $this->addAsset($array, 'script', $group, $location);
    }

    /**
     * Methode pour ajouter les packages 'node_modules'
     *
     * @param array $array		  Tableau contenant les js à charger
     * @param array $typeAsset     script / style
     * @param array $group		   type de ressource (global / module)
     * @param array $location	   position de chargement dans le code HTML (top / bottom)
     */
    protected function setPackage($array, $typeAsset = 'script', $group = 'global', $location = 'top')
    {
        array_walk($array, function(&$item) {
            $item = PATHPACKAGE.$item;
        });
        return $this->addAsset($array, $typeAsset, $group, $location);
    }

    /**
     * Gestion de l'ajout des assets pour la page
     * @param array $assetAdd      Tableau des assets à ajouter
     * @param str $type            'script' / 'style'
     * @param str $group           nom du groupe de fichier
     * @param array $location	   position de chargement dans le code HTML (top / bottom)
     * @return boolean
     */
    private function addAsset($assetAdd, $type, $group, $location)
    {
        if (!isset($this->tabAssetsFiles[$type])) {
            $this->tabAssetsFiles[$type] = array();
        }
        $arraySource = &$this->tabAssetsFiles[$type];

        //groupe
        if (!isset($arraySource[$group])) {
            $arraySource[$group] = array();
        }

        //localisation
        if (!isset($arraySource[$group][$location])) {
            $arraySource[$group][$location] = array();
        }

        $arraySource[$group][$location] = array_merge_recursive($arraySource[$group][$location], $assetAdd);

        return true;
    }


    /**
     * Prépare les assets pour les templates
     * @return Array
     */
    private function generateAssetForView()
    {
        //Chargement de la classe de gestion des Assets
        $assetsFiles = new \Core\assets\Assets($this->environment, WORKENV);
        $assetsFiles->setActiveListFile(true);
        $enteteGroupFile = "/* Liste des fichiers chargés, n'hésistez pas à regarder le code source */\n";

        $listAssets = array();
        foreach ($this->tabAssetsFiles as $type => $detGroupe) {
            foreach ($detGroupe as $group => $detLoc) {
                foreach ($detLoc as $location => $list) {
                    if (isset($listAssets[$type][$location]) === false) {
                        $listAssets[$type][$location] = array();
                    }
                    $pathGenerateFile = $assetsFiles->groupFiles(
                        $list, $type, $group.'_'.$location, $enteteGroupFile
                    );

                    $listAssets[$type][$location] = array_merge($listAssets[$type][$location], $pathGenerateFile);
                }
            }
        }
        return $listAssets;
    }
}
?>