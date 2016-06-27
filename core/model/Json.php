<?php

namespace Core\model;

/**
 * Class de gestion des données JSON
 *
 * @author thomas
 * @version 1.1.0
 */
class Json
{
    /**
     * Fichier JSON à charger
     * @var Str
     */
    protected $files = null;

    /**
     * Pour savoir si on supprime les commentaires
     * @var Bool
     */
    protected $delComment = true;

    /**
     * Contenu du fichier Json
     * @var Array 
     */
    protected $data = null;

    /**
     * Constructeur, permet de charger un fichier Json sans passer par un Extend
     * @param type $files
     */
    public function __construct($files = null)
    {
        $loadFile = ($files !== null) ? $files : $this->files;

        if ($loadFile != null && $this->isFileJson($loadFile) == true) {
            $this->loadFile($loadFile);
        } else {
            trigger_error("The JSON file does not exist or the format is not correct : ".$loadFile, E_USER_ERROR);
        }
    }

    /**
     * Retourne les données au format Tableau
     * @return Array
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Retourne les données au format d'origine JSON
     * @return Json
     */
    public function getDataJson()
    {
        return json_encode($this->data);
    }

    /**
     * Retourne les données d'une clé (1er dimension)
     * @param Str $key  Clé recherchée
     * @return Array
     */
    public function getSearchFirstKey($key)
    {
        if (isset($this->data[$key]) === true) {
            return $this->data[$key];
        }

        return null;
    }

    /**
     * Permet de rechercher une donnée dans le fichier via les clés en le séparant avec des .
     * Ex : macle.details.titre
     * @param type $string
     * @return type
     */
    public function getSearchData($string)
    {
        //on explode la chaine
        $keyTab = explode('.', $string);

        if (count($keyTab) == 0) {
            return null;
        }

        $valueReturn = $this->data;
        for ($i = 0; $i < count($keyTab); ++$i) {
            $key = $keyTab[$i];
            if (isset($valueReturn[$key]) === true) {
                $valueReturn = $valueReturn[$key];
            } else {
                return null;
            }
        }
        return $valueReturn;
    }

    /**
     * Supprime les commentaires dans le fichier Json
     * Il n'est pas possible d'avoir des commentaires en Json, mais pq pas se le permettre
     * @param Str $contentBrut  Données Brut Json avec commentaire
     * @return Str
     */
    protected function delComment($contentBrut)
    {
        return preg_replace(
            "#(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/)|([\s\t](//).*)#", '', $contentBrut
        );
    }

    /**
     * Chargement du fichier JSON
     * @param type $files
     * @return boolean
     */
    private function loadFile($files)
    {
        $data = file_get_contents($files);

        if ($this->delComment == true) {
            $data = $this->delComment($data);
        }
        $this->data = json_decode($data, true);

        return true;
    }

    /**
     * Vérifie si le fichier data existe et si c'est bien un fichier JSON
     * @param Str $pathFile Path du fichier
     * @return boolean
     */
    private function isFileJson($pathFile)
    {
        if (is_file($pathFile) == true) {
            $ext = pathinfo($pathFile, PATHINFO_EXTENSION);
            return (strtolower($ext) == 'json') ? true : false;
        }
        return false;
    }
}