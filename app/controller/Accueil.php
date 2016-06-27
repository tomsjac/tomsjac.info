<?php
namespace App\controller;

/**
 *  Controller de gestion et d'affichage
 *  de la page d'accueil
 *
 * @author Thomas
 * @version 1.0.0
*/
class Accueil extends \App\controller\FrontController
{
    /**
	 * Action par defaut
	*/
    public function index()
    {
        $dataLayout = array();
        $dataTemplate = array();

        //select Menu
        $dataLayout['itemSelect_accueil'] = true;

        //template
        $this->view->setTemplate('acceuil.ms','template');

        //data Layout
        $this->view->setData($dataLayout,'layout');

        //data Template
        $this->view->setData($dataTemplate,'template');
    }
}

?>