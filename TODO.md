* ~~use a Set data struct for recents, it's more natural~~

* ~~when <Home /> passed stickeMOde to an activeIconView we don't wanna reload but
have the flag be set to the new value on the next intended load/reload.  How
do we do that?~~

* ~~extend from PureComponent in compnents that rely on props being passed e.g. <Home />~~

* ~~prop-types not running, at least in tests~~

* deal with load() cb non-successful complesion

* use something other than jquery for such a small task, really we're only using it cause of browser compat and abstraction, also underscore

* shoun'd withqeury() only be called int the module that needs it??

* rm residue pkgs from chrome-giphy-2

* use promise-based axios

* ~~mk a constant.js for action types~~

* get rid of withQuery() and go with the alternative (update:) also what would have been withHasPrefetched() solving the same issue as withQuery() but wasn't implemented b/c we decided to pass it through <Home />. Yeah, the cleaner approach for that should be similar to that of withQuery() and the solutions are:
  problem: hoc wraps a target comp. and the hoc needs state that belongs to that comp
  1. do as we have done withQuery() i.e. bring state up to an hoc
  2. instead of having the component be the deepest (nested) component, nest the hoc's **inside** of the componnet so that it's now the shallowest (if it's possible and makes sense)
  3. keep state in redux store and now we don't need to pass down any props at all. the tradeoff is that you now have to bind (connect in redux terms) two components: withQuery() (the one it returs that is) and the target componet.  I like this approach more b/c we don't depend on any component providing the necessary props, they are isolated and no need to worry about order of compose(with*(), with*())

* perhaps rename withSpinner() cuase now it passes pagination

* have the init page when in untouche state display random fun searches like
  npm's

* copy image to clipboard: I've only found npm pkgs that copy text.  I've found
this https://stackoverflow.com/a/40547470/3280654 and it might work.  If it
seems viable wrap it in a react component so that we may then import it in
Grid.js and use it declaratively

* ~~reload the current on sticker toggle~~

* ~~not all icons should change color on hover only the clickable ones same goes for the cursor css prop~~

* ~~pass "title " to Icon and have icon pass down any props it don' recognize~~

* reset icon in search bar

* on select() when it copies to clipboard, make the giphy go bigger and back small likea click

* tag option in random only
-------------
``
next
----
1. make it pretty ✅
2. cleanup ✅
4. settings loading from disk with and chrome extension
3. toods



settings
--------
1. package extension with a default config
2. on startup load config
3. settings page is simply the user-facing form of config, modifying settings should modify config file so next time we load it changes persist
4. the queries section of the config should modify queries.  Either a read-from-queryes-portion-of-config in withQuery.js or mk another decorator withSettingsQueries.js. I like the latter. so withSettingsQueries() will read from config and apply those.

structure of settings will look like:

giphs per load: 25
rating:         G
lang:           en

UI of settings will look like:

Gips per load:          <NumberInput>
Rating:                 <DropdownSelec>
Lang:                   <Dropdown>

toggles will use a <ToggleIcon ?>

Implementation of settings storage:

* in redux store:
actions:
  * SETTINGS_LOAD
  * SETTINGS_UPDATE

* withSettingsQueries() should be common to all request types (activeIconViews) so there is no need to declare it repeatedly do it once but make sure it is below withQueries() so it gets the wrapped load()
* withSettingsQueries() should connect() to the store to get store.settings and then apply the appropriate queries.  It could filter out the queries that don't belong but then it would have to know the activeIcon.  Or you could just pass them up and let withQueries() filter out the ones that don't belong.
