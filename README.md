# Addresses mod metadata generator

This is an utility project to help creating metadata for road markers from Addresses Mod, to be bundled inside a Write Everywhere module.

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd my-nodejs-project
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Running the Application

Before running, edit the file at `src/index.ts` as you desire. 

### Explaining types

`AdrFields` is a map of `string` key and `AdrFieldData` value. The keys are used at `condition` fields to check value.

`AdrFieldData` properties:
- `localization`: The locale key of the field, to display the name at toolbox
- `parameter`: Tells which Addresses component parameter will be changed on this field (0 or 1)
- `position`: the bit position inside the parameter where the value will be stored (0 to 31), starting from the less valuable bit
- `size`: how many bits will be written, from the less to higher bit. `position + size` never will be higher than 31, truncating higher bits if necessary
- `condition`: logical condition to this field be available on UI. If ommited, always will show.
- `type`: can be `NUMBER` or `SELECTION`:
  - `NUMBER` will show a raw number input on UI. Min and max values may be optionally set.
  - `SELECTION` requires to the `options` field to be filled.
- `options`: A map composed by a `number` key and a `string` value. The key will be set at parameter and the value is the locale to be used to display the name of the option to the user at UI.

The type `FieldsAvailable` must have all `AdrFields` keys to typescript work well. Some utility functions are available there too.

### Generating the json

Just run `npm run start`. An `output.json` file will be generated with the values.

### Adding inside the module

Open the `.welayout.xml` file that you want to add the metadata. Before the `<\WELayout>` tag at end of the file, add following:
```xml
<metadata dll="AddressesCS2" refName="RoadMarkerLayout"><![CDATA[JSON CONTENT HERE]]></metadata>
```
Change `JSON CONTENT HERE` to the content generated on `output.json`.

### REMEMBER!

Don't forget to link your module to one slot of Addresses Mod custom templates, at Write Everywhere Window => Prefab Templates Setup tab => Addresses & Names Mod!

## License

This project is licensed under the MIT License.