# Explication du Fonctionnement des Proxies en Blockchain

## 🌉 Qu'est-ce qu'un Proxy dans la Blockchain?

Un **proxy** dans la blockchain est un contrat qui sert d'intermédiaire pour déléguer des appels à un autre contrat, connu sous le nom de contrat d'implémentation ou de logique. Imaginez-le comme un téléphone portable : lorsque vous voulez mettre à jour le logiciel (la logique), vous n'avez pas besoin de changer de téléphone (le proxy); vous mettez juste à jour l'application.

![Image Proxy](https://www.google.com/imgres?q=proxy%20smart%20contract&imgurl=https%3A%2F%2Fi.stack.imgur.com%2F5VEOd.png&imgrefurl=https%3A%2F%2Fethereum.stackexchange.com%2Fquestions%2F2404%2Fupgradeable-smart-contracts&docid=sWOasYJHnm42-M&tbnid=GqxriPP1DcSOFM&vet=12ahUKEwimzP6fsuCFAxUtVqQEHY7DD48QM3oECBMQAA..i&w=1920&h=1080&hcb=2&ved=2ahUKEwimzP6fsuCFAxUtVqQEHY7DD48QM3oECBMQAA)

## 🔄 Pourquoi Utiliser un Proxy?

L'utilisation de proxies dans la blockchain permet:

- **Mises à jour du Code**: Changez la logique sans modifier l'adresse du contrat ni les balances du contrat.
- **Économie de Gaz**: Les utilisateurs n'ont pas besoin de migrer des actifs entre les anciens et les nouveaux contrats.
- **Transparence**: Les utilisateurs interagissent avec la même adresse de contrat, même après des mises à jour.

## 🚧 Différences entre les Proxies

Il y a différents types de proxies, mais ils suivent tous le principe de séparation entre le stockage des données et la logique d'application.

### Proxy Simple (`ProxyLicense.sol`)

Ce type de proxy redirige simplement tous les appels vers un contrat d'implémentation spécifié. Vous pouvez mettre à jour la logique en changeant l'adresse de l'implémentation cible.

### Proxy Upgradable (`ProxyLicense2.sol`)

Semblable au proxy simple, mais souvent utilisé avec un pattern comme **UUPS (Universal Upgradeable Proxy Standard)**, où le contrat d'implémentation lui-même contrôle la logique de mise à niveau. Cela permet un contrôle plus sécurisé des mises à jour.

### UUPS Proxy

**UUPS** est un modèle de mise à niveau dans lequel le code de mise à niveau est dans le contrat d'implémentation lui-même. Cela réduit les risques et la complexité car seul le contrat d'implémentation doit être modifié pour les mises à niveau.

### Transparent Proxy

Un **Transparent Proxy** utilise un contrat d'administration séparé pour les mises à niveau. Cela signifie que seul l'administrateur peut changer l'implémentation, et les utilisateurs normaux ne peuvent pas accidentellement interagir avec les fonctions d'administration.

## 🧰 Utilisation de l'Assembleur

Les proxies utilisent souvent de l'assembleur pour une interaction bas niveau avec le bytecode. Cela leur permet de rediriger les appels et d'économiser du gaz, mais cela peut être moins lisible et plus complexe à maintenir.

## 📌 Initializable

**Initializable** est un pattern utilisé pour les contrats pouvant être mis à jour. La première fois qu'un contrat est déployé, il est initialisé avec des données. Pour les déploiements ultérieurs, au lieu de réinitialiser ces données, le contrat utilise l'état déjà initialisé du stockage de proxy.

## 📜 Exemples Basés sur les Proxies Fournis

### Utilisation de `ProxyLicense.sol`

Lorsque `createLicenseCollection` est appelé, il utilise `delegatecall` pour exécuter la logique dans le contrat d'implémentation cible tout en maintenant le stockage de données dans le contrat proxy.

### Initialisation avec `ProxyLicense2.sol`

La fonction `fallback` est le cœur de ce proxy. Quand un utilisateur appelle une fonction non présente dans `ProxyLicense2`, `fallback` déclenche `delegatecall` vers le contrat d'implémentation.

---

En résumé, les proxies sont essentiels pour les contrats évolutifs dans la blockchain. Ils permettent de changer la logique sans toucher à l'adresse ou aux données du contrat, assurant ainsi la flexibilité et l'évolutivité des projets de smart contracts.

Vous pourrez retrouver plus de documentation via ces liens :

- [OpenZeppelin: Upgradeable Plugin](https://docs.openzeppelin.com/upgrades-plugins/1.x/)
- [EIP-1967: Standard Proxy Storage Slots](https://eips.ethereum.org/EIPS/eip-1967)
- [EIP-1822: Universal Upgradable Proxy Standard (UUPS)](https://eips.ethereum.org/EIPS/eip-1822)
