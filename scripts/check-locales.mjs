import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { languages } from "../src/i18n/languages.js";

function flatten(resource, prefix = "") {
  return Object.entries(resource).flatMap(([key, value]) => {
    const name = `${prefix}${key}`;
    return typeof value === "object" && value !== null
      ? flatten(value, `${name}.`)
      : [[name, value]];
  });
}

function readResource(language) {
  const filename = language === "kk" ? "kz" : language;
  return new Map(flatten(JSON.parse(readFileSync(new URL(`../src/i18n/locales/${filename}.json`, import.meta.url), "utf8"))));
}

const reference = readResource("en");
assert.equal(new Set(languages.map(({ value }) => value)).size, languages.length, "Duplicate language codes");

for (const { value: language, locale } of languages) {
  const resource = readResource(language);
  assert.deepEqual([...resource.keys()].sort(), [...reference.keys()].sort(), `${language}: translation keys do not match`);
  for (const [key, translation] of resource) {
    assert.ok(typeof translation === "string" && translation.trim(), `${language}.${key}: empty translation`);
    assert.ok(!translation.includes("\uFFFD"), `${language}.${key}: invalid text encoding`);
    const placeholders = text => [...text.matchAll(/\{\{\s*(.*?)\s*\}\}/g)].map(([, name]) => name).sort();
    assert.deepEqual(placeholders(translation), placeholders(reference.get(key)), `${language}.${key}: interpolation parameters do not match`);
  }
  assert.doesNotThrow(() => new Intl.DateTimeFormat(locale).format(new Date()), `${language}: invalid date locale`);
}

console.log(`Validated ${languages.length} languages, ${reference.size} keys per language, and all interpolation parameters.`);
