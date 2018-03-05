# Search
> Search is a tool that loads data from a db.xml file and allows users to search that data.

Search is built by [Laith Serhan](https://github.com/laithserhan) and [Jordan Lee](https://github.com/TheRealZuriki).

***

## Search is Smart!
> Search finds data by magic!

Search automagically matches search input text by exact phrase, whole word and partial phrase.

Example: searching `hello world`

Search will check for `hello world`, `hello` and `world`.

Even if Search returns a false positive, Search will still show results.

Example: searching `hello lovely world` but `lovely` is not in the data, Search will still show results for `hello` and `world`.


## Search does More!
> Search also allows options to be toggled via a schema.json file.

- Search data can be weighted for optimized search results.
- Data order sorting.
- Visability _Make specific data hidden from the search results output but can still be searchable!_


## *Search is Fast!*
> Large xml data can be search in a snap!

Search uses search algorithm based on boyer moore horse pool along with some enhancements on search matching!

***

### TODO:
- [ ] Complete this README.md file
- [ ] Teach Search to work with spelling mistakes.
- [ ] Add more possible options/flags including result card buttons.
