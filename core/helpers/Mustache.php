<?php

namespace Core\helpers;

/**
 * Librairie pour simplifier la manipulation de Mustache
 *
 * @author thomas
 * @version 1.1.0
 */
class Mustache
{

    /**
     * Transforme un tableau multidimension, en tableau simplifié
     * pouvant être parcourus par mustache
     *
     * @param Array $array  Tableau à traiter
     * @return 	Array	Les variables à fournir au template
     */
    public static function arrayToTemplate($array)
    {
        $tempArray = array();

        foreach ($array as $key => $val) {
            $tempArray[] = array("key" => $key, "val" => $val);
        }

        return $tempArray;
    }
}