<?php

namespace App\controller;

/**
 *  Controller de gestion et d'affichage
 *  de la page "Contact"
 *
 * @author Thomas
 * @version 1.1.0
 */
class Contact extends \App\controller\FrontController
{

    /**
     * Action par defaut
     */
    public function index()
    {
        //Si on détecte un post, on redirige vers la méthode d'envoi de mail
        if ($this->request->request->count() != 0 && $this->request->request->get('nomContact') != null) {
            $this->envoiMailContact();
        }
        //Meta layout
        $this->setMetaPage();

        //select Menu
        $this->setItemMenuSelect('contact');

        //template
        $this->view->setTemplate('contact.ms', 'template');
    }

    /**
     * Méthode d'envoi du mail
     *
     */
    protected function envoiMailContact()
    {
        $statutMail = array();
        $reqPost    = $this->request->request;

        //Récupération du mail de contact
        $modelContact = new \Core\model\Json(PATHDATA."json/contact.json");

        // on commence par verifier si ce n'est pas un spam  => on simule l'envoi
        // et si le message n'est pas vide                   => on affiche un message
        if (
            (empty($reqPost->get('cestkikilerobot')) == false) or $reqPost->get('cestkikilerobot') === null
        ) {
            //spam
            $statutMail['send'] = true;
        } elseif
        ($reqPost->get('nomContact') != null && $reqPost->get('msgContact') != null
        ) {
            //envoi de mail
            $to = $modelContact->getSearchFirstKey(0);

            // Sujet
            $subject = 'Contact Portfolio Tomsjac';

            // Message
            $message = $this->view->render('contact/mail-contact.ms', $reqPost->all());
            $message = nl2br($message);
            $message = utf8_decode($message);

            // Entete du mail
            $headers = 'MIME-Version: 1.0'."\r\n";
            $headers .= 'Content-type: text/html; charset=iso-8859-1'."\r\n";

            // Envoi du mail
            $send = mail($to, $subject, $message, $headers);

            if ($send == true) {
                $statutMail['send'] = true;
            } else {
                $statutMail['nosend'] = true;
            }
        } else {
            //données manquantes
            $statutMail['nosend']      = true;
            $statutMail['dataNoFound'] = true;
        }

        //on injecte le statut au template
        $this->view->setData(array('statutMail' => $statutMail), 'template');
    }

    /**
     * Modifie les metaDonnées selon la page
     */
    protected function setMetaPage()
    {
        //Meta layout
        $dataMetaPage = $this->modelMeta->getSearchData('contact');
        $dataMetaPage['title'] .= ' - '.$this->modelMeta->getSearchData('global.title');
        $this->setMetaLayout($dataMetaPage);
    }
}
?>