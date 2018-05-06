## TODOs

* ~~use a Set data struct for recents, it's more natural~~

* ~~when <Home /> passed stickeMOde to an activeIconView we don't wanna reload but
have the flag be set to the new value on the next intended load/reload.  How
do we do that?~~

* ~~extend from PureComponent in compnents that rely on props being passed e.g. <Home />~~

* ~~prop-types not running, at least in tests~~

* ~~use something other than jquery for such a small task, really we're only using it cause of browser compat and abstraction, also underscore~~

* ~~shoun'd withqeury() only be called int the module that needs it??~~

* ~~rm residue pkgs from chrome-giphy-2~~

* ~~mk a constant.js for action types~~

* ~~reload the current on sticker toggle~~

* ~~not all icons should change color on hover only the clickable ones same goes for the cursor css prop~~

* ~~pass "title " to Icon and have icon pass down any props it don' recognize~~

* ~~perhaps rename withSpinner() cuase now it passes pagination~~

* deal with load() cb non-successful complesion

* use promise-based axios

* get rid of withSearchQuery() and go with the alternative (update:) also what would have been withHasPrefetched() solving the same issue as withSearchQuery() but wasn't implemented b/c we decided to pass it through <Home />. Yeah, the cleaner approach for that should be similar to that of withSearchQuery() and the solutions are:
  problem: hoc wraps a target comp. and the hoc needs state that belongs to that comp
  1. do as we have done withSearchQuery() i.e. bring state up to an hoc
  2. instead of having the component be the deepest (nested) component, nest the hoc's **inside** of the componnet so that it's now the shallowest (if it's possible and makes sense)
  3. keep state in redux store and now we don't need to pass down any props at all. the tradeoff is that you now have to bind (connect in redux terms) two components: withSearchQuery() (the one it returs that is) and the target componet.  I like this approach more b/c we don't depend on any component providing the necessary props, they are isolated and no need to worry about order of compose(with*(), with*())

* have the init page when in untouche state display random fun searches like
  npm's

* copy image to clipboard: I've only found npm pkgs that copy text.  I've found
this https://stackoverflow.com/a/40547470/3280654 and it might work.  If it
seems viable wrap it in a react component so that we may then import it in
Grid.js and use it declaratively

* UPDATE on 👆🏼: https://developers.google.com/web/updates/2018/03/clipboardapi

* on select() when it copies to clipboard, make the giphy go bigger and back small likea click

* save recents to disk

* After the most recent commit (add popup/) the extension will no longer have access to `chrome.storage` b/c it is an iframe

* use es7 decorators for our decorators
-------------

## next
1. make it pretty ✅
2. cleanup ✅
4. settings loading from disk with and chrome extension ✅
3. todos
