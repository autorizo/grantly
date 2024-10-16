module.exports = function (plop) {
  // Create a generator for components
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.types.ts',
        templateFile: 'plop-templates/types.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/index.ts.hbs',
      },
      {
        type: 'modify',
        path: 'src/components/index.ts',
        pattern: /(\/\/ Plop: Append components here)/g,
        template: `export * from './{{pascalCase name}}';\n$1`,
      },
    ],
  })

  // Create a generator for SVG icons
  plop.setGenerator('icon', {
    description: 'Generate a new SVG icon component',
    prompts: [
      {
        type: 'input',
        name: 'iconname',
        message: 'Icon name (e.g., StarIcon):',
      },
    ],
    actions: [
      // Add to icons index.ts
      {
        type: 'modify',
        path: 'src/components/icons/index.ts',
        pattern: /(\/\/ Plop: Append icons here)/g,
        template: `export * from './{{pascalCase iconname}}';\n$1`,
      },
      // Create the Icon folder and index.ts inside it
      {
        type: 'add',
        path: 'src/components/icons/{{pascalCase iconname}}/index.ts',
        templateFile: 'plop-templates/index.ts.hbs',
      },
      // Create the Icon Component file using the same template as the component
      {
        type: 'add',
        path: 'src/components/icons/{{pascalCase iconname}}/{{pascalCase iconname}}.tsx',
        templateFile: 'plop-templates/icon-component.tsx.hbs',
      },
      // Create the types file for the Icon using the same types template
      {
        type: 'add',
        path: 'src/components/icons/{{pascalCase iconname}}/{{pascalCase iconname}}.types.ts',
        templateFile: 'plop-templates/icon-types.ts.hbs',
      },
    ],
  })
}
