<?php

namespace App\models;

/**
 * Gestion des données JSON pour les liens externes vers les réseaux sociaux ou autres
 *
 * @author Thomas
 * @version 1.1.0
 */
class SocialLink extends \Core\model\Json
{
    /**
     * Fichier JSON à charger
     * @var Str
     */
    protected $files = PATHDATA."json/socialLink.json";

}