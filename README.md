# :honey_pot::herb: Agave CLI
Agave CLI helps you stop repeating yourself by generating your code from your own template. Inspired by [@angular/cli](https://cli.angular.io/).

+ :white_check_mark: Agave is for writing commonly used logic only once. 
+ :white_check_mark: Agave is faster than copy / pasting code.
+ :white_check_mark: Agave is helpful for code consistency.
+ :white_check_mark: Agave is really easy to use.

Generate new boilerplate from your own templates, fast.

### Use cases?
+ Generate React, Angular, Vue or Svelte components and accompanying unit tests
+ Generate complex reducer and connected component logic
+ Generate GET/PUT/POST/DELETE Restful API endpoints
+ Generate graphQL queries
+ Generate <u>*anything*</u> as long as you write a template!

---
### 1. Summary
Use Agave CLI to generate your own boilerplate for components / tests or any code that is often repeated in your project. 

Simply use `npx agave-cli` and pass a folder containing as many template files as you like. Each template filename should be called `%%c%%`. 

Agave will replace `%%c%%` in each file with your component name and put it in its own folder. Super simple!

This:
```bash
npx agave-cli config=absolute/path/to/templates [list of components]
```
Becomes:
```bash
npx agave-cli config=~/users/Me/Desktop/templates panel loginModal 
...
%%c%%.tsx => Panel/Panel.tsx
%%c%%.test.js => Panel/Panel.test.js
%%c%%.tsx => LoginModal/LoginModal.tsx
%%c%%.test.js => LoginModal/LoginModal.test.js
```
Agave works with or without a framework and with any files / filetypes. 

---
### 2. Get started
All you need to get started is a folder with files you would like to use a template for your components. 

```
/ templates
    %%c%%.tsx
    %%c%%.test.js
    ...etc
```

Agave will go through all the files in this folder and use them as a template to generate a corresponding file replacing every instance of `%%c%%` inside each file. 

---

### 3. How to create templates

To create files for a template, simply use `%%c%%` instead of your component name for the filename AND in your files. 

Once you have your template folder and template files, run Agave from the command directly using `npx agave-cli config=path/to/templates`. 

Where `path/to/templates` is the absolute path to your template directory from the root.

For example:
```bash
npx agave-cli config=~/users/Me/Desktop/templates
```
---

### 4. Agave CLI options

There are 3 ways to run Agave.

#### 1. :herb: Provide just the template directory | :white_check_mark:Recommended 
Agave will use all the template files in the directory specified to build your components. Agave will then ask for the names of the components you want to generate.
```bash
npx agave-cli config=path/to/templates
```
---

#### 2. :herb: Provide both template directory and component names
Agave will use all the template files in the directory specified to build your components. Agave will treat all arguments that do not start with config= as component names and build these components. 
```bash
npx agave-cli config=path/to/templates myComponent1 myComponent2 myComponentN
```
---

#### 3. :bug: No parameters | :x: Not recommended
Agave will use premade templates to build your components. In ver 1, this will be a React, Storybook and Jest / Enzyme Test. **Strongly not recommended due to bugs.**

```bash
npx agave-cli
```


---

Thank you for using Agave CLI :heart: