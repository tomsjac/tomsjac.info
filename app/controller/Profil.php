<?php

namespace App\controller;

/**
 *  Controller de gestion et d'affichage
 *  de la page "Profil"
 *
 * @author Thomas
 * @version 1.1.0
 */
class Profil extends \App\controller\FrontController
{
    /**
     * Action par defaut
     */
    public function index()
    {
        //select Menu
        $this->setItemMenuSelect('profil');

        //Gestion des onglets de compétences
        $arg = $this->routerInfos['argument'];
        switch ($arg) {
            case 'gestion-projet':
                //*********************************
                //******* Profil : gestion de projet
                //**********************************
                $this->getProfilLead();
                break;
            case 'dev':
                //*********************************
                //******* Profil : dev
                //**********************************
                $this->getProfilDev();
                break;
            case 'integration':
                //*********************************
                //******* Profil : integration
                //**********************************
                $this->getProfilFront();
                break;
            default:
                $this->getProfilLead();
        }

        //on injecte ce template à la vue
        $this->view->setTemplate('profil.ms', 'template');
    }

    /**
     * Informations sur mon profil : Chef de projet
     */
    private function getProfilLead()
    {
        //contenu du layout
        $contentLayout = $this->view->getData('layout');

        //Meta layout
        $this->setMetaPage('lead');

        //on récupére le template correspondant
        $htmlAsset = $this->view->render('profil/profil-gestionProjet.ms', array());
        $this->view->setData(
            array(
            'selectItem_gestionP' => true,
            'templateProfil' => $htmlAsset
            ), 'template'
        );
    }

    /**
     * Informations sur mon profil : Dev
     */
    private function getProfilDev()
    {
        //contenu du layout
        $contentLayout = $this->view->getData('layout');

        //Meta layout
         $this->setMetaPage('dev');

        //on récupére le template correspondant
        $htmlAsset = $this->view->render('profil/profil-dev.ms', array());
        $this->view->setData(
            array(
            'selectItem_dev' => true,
            'templateProfil' => $htmlAsset
            ), 'template'
        );
    }

    /**
     * Informations sur mon profil : Intégration
     */
    private function getProfilFront()
    {
        //contenu du layout
        $contentLayout = $this->view->getData('layout');

        //Meta layout
        $this->setMetaPage('front');

        //on récupére le template correspondant
        $htmlAsset = $this->view->render('profil/profil-integration.ms', array());
        $this->view->setData(
            array(
            'selectItem_int' => true,
            'templateProfil' => $htmlAsset
            ), 'template'
        );
    }

    /**
     * Modifie les metaDonnées selon la page
     * @param type $key
     */
    protected function setMetaPage($key)
    {
        //Meta layout
        $dataMetaPage = $this->modelMeta->getSearchData('profil.'.$key);
        $dataMetaPage['title'] .= ' - '.$this->modelMeta->getSearchData('global.title');
        $this->setMetaLayout($dataMetaPage);
    }
}
?>