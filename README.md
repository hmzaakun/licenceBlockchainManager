# Licences Blockchain Platform

[Liens du Figma](https://www.figma.com/file/7gQniYBbUTHSFX85mzBD52/Untitled?type=design&node-id=0%3A1&mode=design&t=Vw59N7LdBS0eKMd9-1)

## 🖼️ Aperçu de l'Architecture

Notre projet est une plateforme basée sur la blockchain qui permet aux créateurs de vendre des licences sous forme de tokens non fongibles (NFT). Voici comment les différents composants interagissent :

- **Site Web**: Interface principale pour les utilisateurs, où ils peuvent créer des comptes et gérer leurs licences NFT.
- **Create Wallet**: Les utilisateurs créent un portefeuille numérique via Thirdweb pour stocker et gérer leurs NFT.
- **Creator**: Les créateurs peuvent ajouter des collections d'NFT à la plateforme.
- **Proxy**: Permet de modifier la logique du contrat Factory sans changer l'adresse du contrat.
- **Factory (License.sol)**: Un smart contract qui crée des collections d'NFT et gère la vente des licences.
- **Collection (ERC721)**: Les NFT individuels représentant les licences.
- **User**: Les utilisateurs achètent des licences NFT en ajoutant des fonds via Moonpay.
- **Admins**: Gèrent la plateforme et le trésor des revenus stocké dans le Gnosis Safe.

![Image architecture](https://cdn.discordapp.com/attachments/1232994091399118849/1233384335948775424/image.png?ex=662ce62c&is=662b94ac&hm=ae89cc5002b7c65cd79088a4f60caee32d2998c6dd41f190e147a41bbe8fd089&)

## 🚀 Comment Lancer le Projet

Pour démarrer le projet sur votre machine locale, suivez ces étapes :

1. Cloner le dépôt de code sur votre machine locale.
2. Naviguez vers le dossier du projet dans votre terminal.
3. Exécutez la commande suivante pour installer toutes les dépendances :

   ```sh
   npm install
   ```

4. Pour démarrer le serveur de développement, exécutez :

   ```sh
   npm start
   ```

5. Le projet devrait maintenant être en cours d'exécution sur `http://localhost:3000`.

## 📜 Adresses des Smart Contracts et Smart Account

Pour interagir avec la blockchain, vous aurez besoin des adresses des smart contracts et du smart account (Gnosis Safe). Vous pouvez les trouver ci-dessous ceux qui sont déjà déployer sur sépolia testnet:

- **License Factory Contract**: `0x56374A1da8AE3d39F249C63E955F5a347Bb0E615`
- **Proxy Contract (Version 1)**: `0x7009469e65b885Dc195d9D6B86E27b8B9eD53325`
- **Proxy Contract (Version 2)**: `0x834fBD93C4df302E83018A8Cf85E8AAB6be3324e`
- **Smart Account Treasury (Gnosis Safe)**: `0x86F2986999A3eE70fD12d595d5812Ad76226e614`

## 🛠️ Développement

Notre front-end est construit avec React et utilise Thirdweb pour la connexion au portefeuille. Moonpay est intégré pour permettre aux utilisateurs de créditer leurs wallets avec une carte bancaire.

### Smart Contracts

Nous avons deux versions du smart contract `ProxyLicense.sol` pour gérer la logique de nos licences NFT, ainsi que `License.sol` qui agit comme une Factory pour créer des collections d'NFT.

### Sécurité

Le contrat Factory inclut `ReentrancyGuard` pour prévenir les attaques de réentrance et `SafeMath` pour des calculs sécurisés sans dépassements de capacité.

---
