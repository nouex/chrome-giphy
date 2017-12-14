This document is mean to document the data flow of decorators.

## Terms
* _digest_: a component does not pass down the same prop
  name down the line, i.e. it was meant for the component
  and no one else
* _consume_: component makes use of

action.load
  @param shouldReplace
  @param activeIcon
  @param stickerMode
  @param queries
  @param cb

withLoad()
  props.load
    * YES required
    * NO consume
    * NO digest
    * NO modify

withQueries()
  props.load
    * YES required
    * YES consume
    * NO digest
    * YES modifies: merges queries param with defaults

withSpinner()
  props.load
    * YES required
    * YES consume
    * NO digest
    * YES modifies: make @param cb optional and wraps under
      their cb that does other stuff if one is present

withStickerMode()
  props.load
    * YES required
    * YES consume
    * NO digest
    * YES modifies: masks @param shouldReplace in occasions
      and makes removes @param stickerMode

withQuery()
  props.load
    * YES required
    * YES consume
    * NO digest
    * YES modify @param queries is now removed

withScrollBottomLoad()
  props.load
      * YES required
      * YES consume
      * NO digest
      * does NOT modify
