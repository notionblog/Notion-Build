# Notion Build
![NotionBlog](./guide/Cover.png)

### An extension that injects a button in Notion.so to Trigger Netlify - Vercel Build hook

## How to Use it 

### 1 - Clone this repository
### 2 - Open `chrome://extensions/`
### 3 - Click `Load Unpacked` and upload the extension directory
![load Extension](./guide/loadExtension.png)
### 4 - Pin 
![pin Extension](./guide/pin.png)
### 5 - Open the extension and fill the inputs (build Hook Url and badge Status link)
![popup](./guide/popup.png)

### 6 - Open Notion you will notice the `publish changes` button injected and badge status in any database page 
![inject](./guide/Inject.png)

**To inject the button in specific database you need to change `"matches"` property to the link you want in `manifest.json` file**