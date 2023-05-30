# Chrome Extension i18n tool

Automatically generates Chrome Extension's _locales JSON files from one CSV file.

Starting from column 3 in the CSV file, the values in each column will be output to the corresponding messages.json.

| LocaleCode | LanguageRegion         | appName       | appDesc         |
| ---------- | --------------------- | -------------| ---------------|
| en         | English               | my app        | my app desc     |
| en_US      | English (USA)         | my app en_US  | my app desc en_US|
| en_GB      | English (Great Britain)| my app en_GB | my app desc en_GB|


The above structure will generate the following content in `./_locales/<LocaleCode>/message.json`.

```json
{
  "appName": {
    "message": "my app"
  },
  "appDesc": {
    "message": "my app desc"
  }
}
```

## Usage

### 1. Manually edit locale.csv

> Do not to change the contents of the first two columns.

### 3. Generate the locale files

```bash
# install dependencies
npm install

# build locale file
npm run build
```