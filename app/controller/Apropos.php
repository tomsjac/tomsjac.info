<?php
namespace App\controller;

/**
 *  Controller de gestion et d'affichage
 *  de la page "A propos"
 *
 * @author Thomas
 * @version 1.1.0
*/
class Apropos extends \App\controller\FrontController
{

    /**
	 * Action par defaut
	*/
    public function index()
    {
        //Meta
        $this->setMetaPage();

        //select Menu
        $this->setItemMenuSelect('apropos');

        //template
        $this->view->setTemplate('apropos.ms','template');
    }

    /**
     * Modifie les metaDonnées selon la page
     */
    protected function setMetaPage()
    {
        //Meta layout
        $dataMetaPage = $this->modelMeta->getSearchData('apropos');
        $dataMetaPage['title'] .= ' - '.$this->modelMeta->getSearchData('global.title');
        $this->setMetaLayout($dataMetaPage);
    }
}
?>