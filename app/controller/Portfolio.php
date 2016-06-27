<?php
namespace App\controller;

/**
 *  Controller de gestion et d'affichage
 *  de la page "Portfolio"
 *
 * @author Thomas
 * @version 1.1.0
*/
class Portfolio extends \App\controller\FrontController
{
    /**
     * Model pour gérer les données des projets
     * @var Array
     */
    private $modelProject = array();

    /**
     * Constructeur + Chargement des données Json pour la partie
     * @param  Array $router    Infos du routeur
     */
    public function __construct($router = null, \Core\system\Environment $envRequest)
    {
        parent::__construct($router, $envRequest);

        //On parse le contenu json pour cette partie
        $this->modelProject = new \App\models\Projects;
    }

    /**
	 * Action par defaut
	*/
    public function index()
    {
        //select Menu
        $this->setItemMenuSelect('portfolio');

        /*
          // cas de figure
          - Lien direct sur la page portfolio : On récupére le json des projets, et on affiche la page Portfolio
          - Appel Ajax de la page portfolio : On récupére le json des projets, et on affiche la page Portfolio
          ----
          - Lien direct sur un projet : On charge le projet directement + lorsqu'on quitte celui-ci on charge en Ajax le page Portfolio
          - !! Appel Ajax d'un projet : Pas possible
         */
        if ($this->routerInfos['argument'] == null) {
            $this->getListProject();
        } else {
            $idProject = $this->routerInfos['argument'];
            $this->getProject($idProject);
        }

        //On set un helper a mustache, dans les cas on les données sont absente
        //on la remplace par une clé qui sera utilisé par le Js pour remplacer le contenu
        /*
		$this->view->getHelper('includeTemplateScript', function ($data,$m) {
			return file_get_contents($this->infoServer['PATH_SERVER'].PATHTEMPLATE.$data);
		});
		*/
    }


    /**
     * Listing des projets
     */
    private function getListProject()
    {
        //***********************************
        //** Appel de la page Portfolio
        //**********************************
        //Meta layout
        $this->setMetaPage();

        //On va diviser les projets par block de 4
        $listProjectGrouped = $this->modelProject->getGrouped(4);

        //On récupére le template de détails d'un projet
        //pour qui soit pas interprété par Php Mustache (module view), Mais avec mustache JS
        //car les données sont transmit au template principal en JSON et traité en Javascript
        $templateDetailsProjet = file_get_contents($this->infoServer['PATH_SERVER'].PATHTEMPLATE.'portfolio/apercu-projet.ms');

        $this->view->setData(
            array(
            'projetList' => $listProjectGrouped,
            'projetJson' => $this->modelProject->getDataJson(),
            'templateDetailsProjet' => $templateDetailsProjet
            )
            , 'template'
        );

        $this->view->setTemplate('portfolio.ms', 'template');
    }


    /**
     * Détails et infos sur un projet
     * @param str $idProject
     */
    private function getProject($idProject)
    {
        //***********************************
        //** Appel direct d'un projet
        //**********************************
        $dataProject = $this->modelProject->getSearchFirstKey($this->routerInfos['argument']);
        if ($dataProject !== null) {

            //Meta layout
            $this->setMetaPage(
                array(
                    'title' => 'Projet : '.$dataProject['nom'],
                    'description' => $dataProject['slogan'].' - Portfolio : '.$dataProject['nom'],
                )
            );

            //on adapte le tableau des slides pour le template
            $dataProject['imgSlide'] = \Core\helpers\Mustache::arrayToTemplate($dataProject['imgSlide']);
            //echo"<pre>"; print_r($infosProjet); echo"</pre>";

            $this->view->setData(
                array(
                    'infosProjet' => $dataProject
                )
                , 'template'
            );

            $this->view->setTemplate('portfolio/apercu-projet.ms', 'template');
        } else {
            //Page d'erreur
            $this->errorPage();
        }
    }

    /**
     * Modifie les metaDonnées selon la page
     * @param Array $array Tableau des données à remplacer
     */
    protected function setMetaPage($array = null)
    {
        //Meta layout
        $dataMetaPage = $this->modelMeta->getSearchData('portfolio');

        //On remplace les données
        if (empty($array) == false && $array != null) {
            $dataMetaPage = array_merge($dataMetaPage, $array);
        }

        $dataMetaPage['title'] .= ' - '.$this->modelMeta->getSearchData('global.title');
        $this->setMetaLayout($dataMetaPage);
    }
}

?>