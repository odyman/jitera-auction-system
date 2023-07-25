# Jitera-Auction-System
This web application is an online auction system where users can create and bid on items


React App is created using [vite](https://vitejs.dev), it automates the build of the app and the environment will have everything to build a modern React app and for UI components meticulously crafted using Tailwind CSS & React Hooks.

For Mockup API server is written using [miragejs](https://miragejs.com/) for mocking API calls.


## Core libraries used
Here is a list of some core libraries that used:
- **[React](https://reactjs.org)** A popular JavaScript library for building user interfaces.

- **[TypeScript](https://www.typescriptlang.org)** TypeScript is a strongly typed programming language that builds on JavaScript

- **[Vite](https://vitejs.dev)** Vite is a modern, blazing-fast tool for scaffolding and bundling

- **[TailwindCSS](https://tailwindcss.com)** A utility-first CSS framework packed with classes.

- **[Redux Toolkit](https://redux-toolkit.js.org)** Redux Toolkit is package that help to write Redux(State management tool) logic.

# Running Application
Install node and npm globally.
## Running React App
Open command prompt or git bash navigate to project folder.

    cd jitera-auction-system/front
First grab the dependencies with npm:

    npm install
   
Then run the app:

    npm start
  
and navigate to http://127.0.0.1:5173/

## Using React App
When you have running the react app in your local environment, you will be redirected to the login page, where you can use user: admin | password: 123Qwe this credential to sign in.



## Folder Structure
Below is a schematic diagram of directory structure:
```
├── public                    # Static resource
├── img                       # Images
└── ...                       # Other static files
├── src
│   ├── @types                    # type files that share across the temeplate
│   │   ├── ...                   
│   ├── assets                    # App static resource
│   │   └── styles	              # Global CSS files
│   ├── components                # General components
│   │   ├── layout                # Layout components
│   │   ├── route                 # Components related to route
│   │   ├── shared                # Upper level components built on top of ui components
│   │   ├── template              # Template components, such as Header, Footer, Nav, etc...
│   │   └── ui                    # Bottom level components, such as Button, Dropdown, etc...
│   ├── configs                   # Configuration files        
│   │   └── ...          
│   ├── constants                 # Constant files
│   │   └── ...      
│   ├── mock                      # Mock data for fake API Calls
│   │   ├── data                  # Mock data
│   │   |   └── ...               # Mock data TS files
│   │   ├── mockApi               # Mock API configuration
│   │   |   └── ...               # Mock API TS files
│   │   └── index.ts              # Mock entry file
│   ├── services                  # Service files for managing API integrations
│   │   ├── ApiService.ts         # Api request & response handler
│   │   ├── BaseService.ts        # Axios configs & interceptors
│   │   └── ...                   # Other service files
│   ├── store                     # Main Redux store
│   │   ├── slices                # Genaral slices 
│   │   |   └── ...           
│   │   ├── hook.ts               # Store hook file    
│   │   ├── index.ts              # Store entry file
│   │   └── rootReducer.ts        # Root reducer
│   │   └── storeSetup.ts         # Overall store setup
│   ├── utils                     # All reusable function & hooks
│   │   ├── hooks                 # Hooks
│   │   |   └── ...      					
│   │   └── ...                   # Reusable functions 
│   ├── views                     # View files that render all the pages
│   |   ├── ...                   # All view files
│   |   └── index.ts              # View entry point
│   |   App.tsx                   # App setup
│   |   index.css                 # Css entry
│   |   main.tsx                  # React entry
│   └── vite-env.d.ts             # Vite environment declaration
├── .twSafelistGenerator          # Tailwind middleware for safe list
├── .eslintignore                 # Ignore file for eslint  
├── .eslintrc.cjs                 # eslint config
├── .gitignore                    # Ignore file for git
├── .prettierignore               # Ignore file for prettier
├── .prettierrc                   # Prettier config 
├── index.html                    # Entry file for the web
├── package.json                  
├── package.lock.json            
├── postcss.config.cjs            # PostCss configuration file
├── README.md  
├── safelist.txt                  # A generated whitelist classes for Tailwind css 
├── tailwind.config.cjs           # TailwindCSS configuration file
├── tsconfig.eslint.json          # Typescript config for eslint
├── tsconfig.json                 # Project Typescript configuration file
├── tsconfig.eslint.json          # Typescript config for node
└── vite.config.ts                # Config file for vite   
```        

