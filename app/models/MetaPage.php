<?php

namespace App\models;

/**
 * Gestion des données JSON pour les balises Méta du template HTML
 *
 * @author Thomas
 * @version 1.1.0
 */
class MetaPage extends \Core\model\Json
{
    /**
     * Fichier JSON à charger
     * @var Str
     */
    protected $files = PATHDATA."json/metaPage.json";

    /**
     * On merge le contenu de la page avec les données globales
     * @param array $array  Tableau des données à fusionner
     * @return  Tableau des méta données
     */
    public function mergeMetaPage($array)
    {
        $dataGlobal = $this->getSearchData('global');
        if (empty($array) == true or $array == null) {
            return $dataGlobal;
        }
        return array_merge($dataGlobal, $array);
    }
}