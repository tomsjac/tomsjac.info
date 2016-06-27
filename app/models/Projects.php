<?php
namespace App\models;

/**
 * Gestion des données JSON propre au portfolio
 *
 * @author Thomas
 * @version 1.1.0
 */
class Projects extends \Core\model\Json
{
    /**
     * Fichier JSON à charger
     * @var Str
     */
    protected $files = PATHDATA."json/portfolio.json";

    /**
     * Permet de regrouper les projets en block X projets
     * @param int $nb   Nombre de projet par block
     */
    public function getGrouped($nbByBlock = 4)
    {
        $listByBlock = array();
        $iB          = 0;
        foreach ($this->data as $key => $value) {
            if (($iB % $nbByBlock) == 0) {
                if (!isset($keyBlock)) $keyBlock = 0;
                else $keyBlock ++;

                $listByBlock[$keyBlock] = array("block" => $keyBlock,);
            }

            $value['id']                         = $key;
            $listByBlock[$keyBlock]['details'][] = $value;

            $iB++;
        }
        return $listByBlock;
    }
}