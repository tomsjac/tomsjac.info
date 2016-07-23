<?php

namespace Core\assets;

/**
 * Gestion des fichiers web public (JS et feuille de style)
 *
 * @author Thomas
 * @version 1.0.0
 */
class Assets
{
    /**
     * Tableau des infos Server, traité
     * @var array
     */
    protected $infoServer;

    /**
     * Environment  de travail
     * @var str
     */
    protected $workEnv;

    /**
     * Bool permettant de savoir si on veut lister les fichiers compilés
     * @var bool
     */
    protected $activeListFile;

    /**
     * Contenu des fichiers chargés lors de la compilation
     * @var str
     */
    protected $contentListFile;

    /**
     * Constructor
     *
     * @param Core\system\Environment $envRequest
     * @param str   $workEnv     	  Variable d'environnement de travail
     */
    public function __construct(\Core\system\Environment $envRequest, $workEnv)
    {
        $this->infoServer = $envRequest->getServer();
        $this->workEnv    = $workEnv;
    }

    /**
     * Active, ou désactive l'affichage des fichiers en entête
     *
     * @param bool $value    	true / false
     */
    public function setActiveListFile($value = true)
    {
        $this->activeListFile = $value;
    }

    /**
     * Traitement des fichiers Css
     * Parser / minify / Sauvegarde en cache
     *
     * @param str $pathFile    	 Chemin du fichier à traiter
     * @param str $returnFile    Type de retour, le chemin du fichier en cache, ou le contenu 'path' / 'content'
     * @param Bool $noSaveCache  Ne sauvegarde pas le fichier en cache à true
     * @return str retourne le chemin du fichier traité
     */
    public function compileCss($pathFile, $returnFile = 'path', $noSaveCache = false)
    {
        $returnFinal = "";

        $extensionParser = array('less');

        $infosFile        = pathinfo($pathFile); 
        $pathServerFile   = $this->infoServer['PATH_SERVER'].$pathFile;
        $this->setContentListFile("/* Fichier source : ".$pathFile." */\n");
        $parserFileActive = in_array($infosFile['extension'], $extensionParser);

        $fileNameCache     = str_replace(array('/', '.'), '_', $infosFile['filename']).'.css';
        $pathRelativeCache = 'partial/'.$fileNameCache;
        $pathServerCache   = $this->infoServer['PATH_SERVER'].PATHCACHEJSCSS.$pathRelativeCache;

        //En prod
        if ($this->workEnv == 'prod') {

            if ($this->regenereCache($pathServerCache, $pathServerFile) == true) { // on verifie si on pas déjà le fichier en cache
                //on génere le fichier en cache
                $content = $this->getContent($pathServerFile);
                if ($parserFileActive == true) { // si c'est du less
                    $content = $this->parserCss($content, $infosFile['extension']);
                }

                //on le minify
                $content = $this->minifyCss($content);

                //on sauvegarde le content
                if ($noSaveCache == false) $this->saveCache($content, $pathServerCache);
            }

            if ($returnFile == 'content') {
                if (isset($content) === false) { //on recupére le contenu en cache, si on a pas le contenu
                    $content = $this->getContent($pathServerCache);
                }
                $returnFinal = $content;
            } else {
                $returnFinal = PATHWEBCACHEJSCSS.$pathRelativeCache;
            }
        } else {  // En dev
            //En dev on recupére la source que si c'est un fichier less
            // a moins que le souhaite le content
            if ($parserFileActive == true) { // si c'est du less, on le sauvegarde en cache
                $content = $this->getContent($pathServerFile);
                $content = $this->parserCss($content, $infosFile['extension']);

                if ($returnFile == 'path' && $noSaveCache == false) { //on sauvegarde le fichier, seulement si on veut son chemin
                    $this->saveCache($content, $pathServerCache);
                }
            }

            if ($returnFile == 'content') {
                if (isset($content) === false) { //on recupére le contenu en cache, si on a pas le contenu
                    $content = $this->getContent($pathServerFile);
                }
                $returnFinal = $content;
            } else {
                //si c'est un fichier parser, on le prend du cache, sinon on prend la source
                if ($parserFileActive == true) $returnFinal = PATHWEBCACHEJSCSS.$pathRelativeCache;
                else $returnFinal = $pathFile;
            }
        }

        return $returnFinal;
    }

    /**
     * Traitement des fichiers JS
     * Parser / minify / Sauvegarde en cache
     *
     * @param str $pathFile    	Chemin du fichier à traiter
     * @param str $returnFile   Type de retour, le chemin du fichier en cache, ou le contenu 'path' / 'content'
     * @param Bool $noSaveCache  Ne sauvegarde pas le fichier en cache à true
     * @return str retourne le chemin du fichier traité
     */
    public function compileJS($pathFile, $returnFile = 'path', $noSaveCache = false)
    {
        $returnFinal = "";

        $infosFile      = pathinfo($pathFile);
        $pathServerFile = $this->infoServer['PATH_SERVER'].$pathFile;
        $this->setContentListFile("/* Fichier source : ".$pathFile." */\n");

        $fileNameCache     = str_replace(array('/', '.'), '_', $infosFile['filename']).'.js';
        $pathRelativeCache = 'partial/'.$fileNameCache;
        $pathServerCache   = $this->infoServer['PATH_SERVER'].PATHCACHEJSCSS.$pathRelativeCache;

        //En prod
        if ($this->workEnv == 'prod') {

            if ($this->regenereCache($pathServerCache, $pathServerFile) == true) { // on verifie si on pas déjà le fichier en cache
                //on génere le fichier en cache
                $content = $this->getContent($pathServerFile);

                //on le minify
                $content = $this->minifyJs($content);

                //on sauvegarde en cache
                if ($noSaveCache == false) $this->saveCache($content, $pathServerCache);
            }

            if ($returnFile == 'content') {
                if (isset($content) === false) { //on recupére le contenu en cache, si on a pas le contenu
                    $content = $this->getContent($pathServerCache);
                }
                $returnFinal = $content;
            } else {
                $returnFinal = PATHWEBCACHEJSCSS.$pathRelativeCache;
            }
        } else {  // En dev
            if ($returnFile == 'content') {
                $content     = $this->getContent($pathServerFile);
                $returnFinal = $content;
            } else {
                $returnFinal = $pathFile;
            }
        }

        return $returnFinal;
    }

    /**
     * Traitement en masse des fichiers externe, pour n'avoir plus qu'une seul ressource en cache
     * Combine File : En dev pas de compilation, en Prod 1 seul fichier créer en cache
     *
     * @param array $groupFile    Tableau des fichiers à traiter
     * @param str 	$typeFile  	  Type de fichier 'script' ou 'style'
     * @param str 	$nameCache    Nom du fichier en cache, si null, hash de la chaine
     * @param str 	$commentFile  Texte de commentaire au début du fichier
     * @return array retourne la liste des fichiers (path complet) à charger dans le layout
     */
    public function groupFiles($groupFile, $typeFile, $nameCache = null, $commentFile = null)
    {
        $returnFiles = array();

        if ($typeFile == 'script') {
            $extension = '.js';
        } elseif ($typeFile == 'style') {
            $extension = '.css';
        }

        //si on est en PROD, on combine en 1 fichier
        if ($this->workEnv == 'prod') {
            $this->setContentListFile($commentFile, true);

            //**** PROD
            if ($nameCache !== null) {
                $fileNameCacheGlobal = $nameCache.$extension;
            } else {
                $filesAllName        = implode("-", $groupFile);
                $filesAllName        = hash('tomsjac', $filesAllName);
                $fileNameCacheGlobal = $filesAllName.$extension;
            }
            $pathServerCacheFileGlobal = $this->infoServer['PATH_SERVER'].PATHCACHEJSCSS.$fileNameCacheGlobal;

            //si le fichier n'existe pas on le crée
            if ($this->regenereCache($pathServerCacheFileGlobal) == true) {
                $contentGlobal = '';

                //on récupére le contenu de tous les fichiers
                foreach ($groupFile as $file) {
                    if ($typeFile == 'script') {
                        $contentGlobal .= $this->compileJS($file, 'content', true);
                    } else {
                        $contentGlobal .= $this->compileCss($file, 'content', true);
                    }
                }

                //on sauvegarde le fichier global
                $this->setContentListFile("/* ************************************************** */ \n"); //Pour une fin jolie
                $this->saveCache($contentGlobal, $pathServerCacheFileGlobal);
            }

            $returnFiles[] = PATHWEBCACHEJSCSS.$fileNameCacheGlobal;
        } else {
            //**** DEV : on s'occupe que de récupérer les fichiers parsés
            foreach ($groupFile as $file) {
                $this->setContentListFile($commentFile, true);
                if ($typeFile == 'script') {
                    $returnFiles[] = $this->compileJS($file, 'path');
                } else {
                    $returnFiles[] = $this->compileCss($file, 'path');
                }
            }
        }

        return $returnFiles;
    }

    /**
     * On vide le cache des fichiers externes
     * @return bool true en cas de succés
     */
    public function clearCache($path = null)
    {
        if ($path == null) {
            $path = $this->infoServer['PATH_SERVER'].PATHCACHEJSCSS;
        }

        if (file_exists($path) && is_writeable($path)) {
            $di = new \DirectoryIterator($path);
            foreach ($di as $file) {
                if ($file->isFile()) {
                    unlink($file->getPathname());
                } elseif ($file != "." && $file != "..") {
                    $this->clearCache($path.$file);
                }
            }
        }

        return true;
    }

    /**
     * Permet de parser les fichiers qui sont écrit en less
     *
     * @param str $content    	Contenu du fichier
     * @param str $extension    Extension du fichier
     * @return str le contenu du fichier un fois parsé
     */
    protected function parserCss($content, $extension)
    {
        if ($extension == 'less') {
            //Cas particulier
            if (isset($less) === false) {
                $less = new \lessc();
                //on ajoute les répertoires CSS possible pour l'import
                $less->setImportDir([$this->infoServer['PATH_SERVER'].PATHCSS, $this->infoServer['PATH_SERVER'].PATHPACKAGE]);
            }

            return $less->compile($content);
        }
        return null;
    }

    /**
     * Permet de minifier les fichiers style (seulement en PROD)
     *
     * @param str $content    	Contenu du fichier
     * @return str le contenu du fichier un fois minifié
     */
    protected function minifyCss($content)
    {
        $minifier = new \Jivaro\Compressor\Css();
        return $minifier->addString($content)->minify()->getContents();
    }

    /**
     * Permet de minifier les fichiers Js
     *
     * @param str $content    	Contenu du fichier
     * @return str le contenu du fichier un fois parsé
     */
    protected function minifyJs($content)
    {
        return \JShrink\Minifier::minify($content);
    }

    /**
     * Retourne le contenu du fichier concerné.
     *
     * @param str $pathFile chemin du fichier
     * @return str le contenu du fichier, ou false en cas d'échec
     */
    protected function getContent($pathFile)
    {
        if (is_file($pathFile) === true) {
            $contenu = file_get_contents($pathFile);
            return $contenu;
        } else {
            trigger_error("Le fichier ".$pathFile." n'existe pas", E_USER_WARNING);
            return false;
        }
    }

    /**
     * Sauvegarde le fichier en cache
     *
     * @param str $content contenu du fichier
     * @param str $pathFileCache chemin du fichier cache
     * @return bool true en cas de succés
     */
    protected function saveCache($content, $pathFileCache)
    {
        $infosPath = pathinfo($pathFileCache);
        $pathCache = $infosPath['dirname'];

        //verifie si le dossier existe sinon on le cree
        if (is_dir($pathCache) === false) {
            if (!(mkdir($pathCache, 0770))) {
                trigger_error('Impossible de créer le dossier : '.$pathCache, E_USER_ERROR);
            }
            chmod($pathCache, 0770);
        }

        //on verifie si le fichier existe
        if (is_file($pathFileCache) === true) {
            unlink($pathFileCache);
        }

        //on verifie si on l'entete des fichiers activés
        if ($this->activeListFile == true) {
            $content = $this->contentListFile.$content;
        }

        //ensuite on écrit le fichier dans le dossier
        if (!$fp = fopen($pathFileCache, 'x+')) {
            trigger_error('copie impossible de '.$fileNameCache.' !', E_USER_ERROR);
        } else {
            fwrite($fp, $content);
            fclose($fp);
            chmod($pathFileCache, 0770);
        }
        return true;
    }

    /**
     *  Ajoute le contenu pour l'entete du fichier
     *
     * @param str  $content contenu pour l'entete
     * @param bool $new 	Si on veut injecter du nouveau contenu ou pas true / false
     */
    protected function setContentListFile($content, $new = false)
    {
        if ($new === false) {
            $this->contentListFile .= $content;
        } else {
            $this->contentListFile = $content;
        }
    }

    /**
     * Verifie si le fichier existe dans le cache
     * Et si oui, s'il a subit des modifications
     *
     * @param str $fileCache  chemin du fichier dans le cache
     * @param str $fileSource chemin du fichier source
     * @return bool           Retourne true on doit regénéré, false c'est bon
     */
    protected function regenereCache($fileCache, $fileSource = null)
    {
        //on verifie déjà si le fichier existe déjà en cache
        if (is_file($fileCache) === false) {
            return true;
        } elseif (isset($fileSource) && (filemtime($fileCache) < filemtime($fileSource))) {
            return true;
        } else {
            return false;
        }
    }
}