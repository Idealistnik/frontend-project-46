### Hexlet tests and linter status:
[![Actions Status](https://github.com/Idealistnik/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Idealistnik/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/9df71864171f1a9caeb1/maintainability)](https://codeclimate.com/github/Idealistnik/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9df71864171f1a9caeb1/test_coverage)](https://codeclimate.com/github/Idealistnik/frontend-project-46/test_coverage)
![example workflow](https://github.com/Idealistnik/frontend-project-46/actions/workflows/testing.yml/badge.svg)

[![asciicast](https://asciinema.org/a/2IjdqEwvwMwnk1Jfz6DTVCarb.svg)](https://asciinema.org/a/2IjdqEwvwMwnk1Jfz6DTVCarb)

[![asciicast](https://asciinema.org/a/vtf6DBVyRJUhywHJGNkmGv7JS.svg)](https://asciinema.org/a/vtf6DBVyRJUhywHJGNkmGv7JS)

[![asciicast](https://asciinema.org/a/R2afqlsZcgTVA7dczrFB4Eh3q.svg)](https://asciinema.org/a/R2afqlsZcgTVA7dczrFB4Eh3q)

[![asciicast](https://asciinema.org/a/XxPNuI4f3U7A1GnkMoEvsP7TJ.svg)](https://asciinema.org/a/XxPNuI4f3U7A1GnkMoEvsP7TJ)

# Вычислитель отличий

**Вычислитель отличий** – программа, определяющая разницу между двумя структурами данных (аналог онлайн сервисов, например http://www.jsondiff.com). 

## Возможности утилиты:

- Поддержка разных входных форматов: yaml, json
- Генерация отчета в виде plain text, stylish и json

## Пример использования:

### формат plain
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

### формат stylish
gendiff filepath1.json filepath2.json

`{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}`

## Установка:
Для устаноки необходимо установить пакет с помощью следующей команды: `npm install @hexlet/code`
