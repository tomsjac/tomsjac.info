<?php

namespace Core\template;

/**
 * Gestion de la vue
 *
 * @author Thomas
 * @version 1.0.0
 */
class View
{
    /**
     * Instance du gestionnaire de template
     * @var object
     */
    protected $view;

    /**
     * Tableau des données à transmettre au template
     * @var array
     */
    protected $dataView;

    /**
     * Tableau des templates à charger
     * @var array
     */
    protected $templateLoad;

    /**
     * Tableau des infos Server, traité
     * @var array
     */
    protected $infoServer;

    /**
     * Constructor
     * @param array $envServer		Tableau contenant les variables d'environement Server
     */
    public function __construct($envServer)
    {
        $this->infoServer = $envServer;

        //Configuration de mustache
        $this->view = new \Mustache_Engine(
            array(
            'cache' => $this->infoServer['PATH_SERVER'].PATHCACHETEMPLATE,
            'loader' => new \Mustache_Loader_FilesystemLoader(
                $this->infoServer['PATH_SERVER'].PATHTEMPLATE, array('extension' => '')
            ),
            'partials_loader' => new \Mustache_Loader_FilesystemLoader(
                $this->infoServer['PATH_SERVER'].PATHTEMPLATE, array('extension' => '')
            ),
            'charset' => 'UTF-8',
            'escape' => function ($value) {
                    return $value; // Pour eviter l'encodage htmlspecialchars par defaut
            }
            )
        );
    }

    /**
     * Methode pour ajouter les données à transmettre au template
     * @param array $arrayData		Tableau contenant les données
     * @param str $type		    	Type des données 'template' / 'layout'
     */
    public function setData($arrayData, $type = 'template')
    {
        if ($type == 'template' or $type == 'layout') {
            if (!isset($this->dataView[$type])) $this->dataView[$type] = array();
            $this->dataView[$type] = array_merge($this->dataView[$type], $arrayData);
        } else {
            trigger_error("Les données doivent être de type 'template' ou 'layout'", E_USER_WARMING);
        }
    }

    /**
     * Methode pour recupérer les données
     * @param  str $type		    	Type des données 'template' / 'layout'
     * @return Array                 Retourne les données selon le type ou null
     */
    public function getData($type = 'template')
    {
        if (isset($this->dataView[$type]) === true) {
            return $this->dataView[$type];
        } else {
            return null;
        }
    }

    /**
     * Methode pour ajouter le fichier template à charger
     * @param str $file				Nom (chemin) du template à charger
     * @param str $type		    	Type des données 'template' / 'layout'
     */
    public function setTemplate($file, $type = 'template')
    {
        if ($type == 'template' or $type == 'layout') {
            if (!isset($this->templateLoad[$type])) $this->templateLoad[$type] = array();
            $this->templateLoad[$type] = $file;
        } else {
            trigger_error("Les données doivent être de type 'template' ou 'layout'", E_USER_WARMING);
        }
    }

    /**
     * Methode pour recupérer		 le fichier template à charger
     * @param  str $type		    	 Type des données 'template' / 'layout'
     * @return Str                	 Retourne le nom du fichier à charger
     */
    public function getTemplate($type = 'template')
    {
        if (isset($this->templateLoad[$type]) === true) {
            return $this->templateLoad[$type];
        } else {
            return null;
        }
    }

    /**
     * Pour ajouter des helpers au template
     * Utilise Mustache
     * @param str $nameHelper			Nom du helper
     * @param obj $function		        Instruction du helper
     */
    public function getHelper($nameHelper, $function)
    {
        $this->view->addHelper($nameHelper, $function);
    }

    /**
     * Pour afficher le rendu de la page
     * Utilise Mustache
     * @param array $templateFile		Chemin du template à charger
     * @param array $data		        Tableau des données à transmettre au template
     */
    public function render($templateFile, $data)
    {
        return $this->view->render($templateFile, $data);
    }

    /**
     * On vide le cache des templates
     */
    public function clearCache()
    {
        $path = $this->infoServer['PATH_SERVER'].PATHCACHETEMPLATE;

        if (file_exists($path) && is_writeable($path)) {
            $di = new \DirectoryIterator($path);
            foreach ($di as $file) {
                if ($file->isFile()) {
                    unlink($file->getPathname());
                }
            }
        }

        return true;
    }
}
?>