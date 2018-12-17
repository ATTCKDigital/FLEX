## Components

### Available Components
List of base components

### Adding components
To create a new acf component, duplicate `components/component_template` in the `components` folder and rename as per naming conventions below. Once the component is created, register and enable it in `config/global-variables/blocks.php`. (More info in `boilerplate-child/README.md`)

#### How to use a component in a front end template:
To include a component in a front end template:
Include it where needed:
`echo Utils::render_template('components/component_name/component-name.php', array());`

Values/variables can be passed into the component template in the array in the `Utils::render_template` function.  To use them in the component template, `$this->varName`.


To add JS to a new component:
- In the component markup, on the outer most div, add `data-component-name="JSComponentName"`
- If it's an existing component, use the existing function name.  If it's a new component, create a new JS file and place in the component folder. 

### Naming Conventions
- Component Folders: `component_component-name`
- Component Markup: `component-name.php`
- Component SCSS: `_component-name.scss`
- Component JS: `_component-name.js`
- Component ReadMe: `README_component-name.md`
- Component ACF Fields: `acf_component-name.php`
- Component Register ACF Fields: `register_component-name.php` (to be placed in a folder called `acf-json` within the component folder)

Created 12/4/2018 by okadots for ATTCK
