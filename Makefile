## Tomsjac.info — Makefile
## Portfolio Nuxt 4 (SPA). Commandes courantes du projet.

.DEFAULT_GOAL := help
.PHONY: help install dev build generate preview prepare clean reinstall audit audit-fix outdated

## help: Affiche cette aide
help:
	@grep -E '^## [a-z-]+:' $(MAKEFILE_LIST) | sed -E 's/## ([a-z-]+): /  \1\t/' | expand -t20

## install: Installe les dépendances
install:
	npm install

## dev: Lance le serveur de développement (http://localhost:3000)
dev:
	npm run dev

## build: Build de production (sortie serveur Nitro dans .output)
build:
	npm run build

## generate: Génère le site statique (.output/public)
generate:
	npm run generate

## preview: Prévisualise le build de production
preview:
	npm run preview

## prepare: Régénère les types Nuxt (.nuxt)
prepare:
	npm run postinstall

## audit: Liste les vulnérabilités des dépendances
audit:
	npm audit

## audit-fix: Corrige les vulnérabilités (sans breaking changes)
audit-fix:
	npm audit fix

## outdated: Liste les paquets obsolètes
outdated:
	npm outdated || true

## clean: Supprime les artefacts de build et le cache
clean:
	rm -rf .output .nuxt dist node_modules/.cache

## reinstall: Réinstallation propre (supprime node_modules et lockfile)
reinstall:
	rm -rf node_modules package-lock.json
	npm install
