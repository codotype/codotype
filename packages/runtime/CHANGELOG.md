### v0.5.0

* Runtime now creates `*-blueprint.json` and `*-build.json` files

#### Breaking Changes
* Refactored `registerGenerator` method to handle `@codotype/generator` `0.4.0` patterns. Each generator now is defined as an Object, rather than a class prototype.

### v0.3.0

#### Breaking Changes
* `registerGenerator` method now accepts an variety of options for locating a generator's entrypoint on the file system. It previously accepted a single string. This change in approach enables us to de-couple `node_modules` from the runtime's internal operation. This simplifies testing of generators and enables more flexible registration vectors in the future (i.e. managed docker containers + volumes).

**Note** - this repository will not be under strict semantic versioning until a more publicized beta release. At the moment `0.X.0.` version changes will represent a breaking change, while `0.0.X` version changes will represent both features & bug fixes.

#### Documentation
* Added `CHANGELOG.md`