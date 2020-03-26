
## 2.7.0 [<b>Release Notes</b>]
___

#### <b>BugFix:</b>

- fixed error "viewport web not correct scroll on Apple";
- fix button a tag clickable if inside of card's class (now can use an extra link);
- fix button a tag child clickable only on text (now completly cover the button);
- fix button height (exluded interline, all button content is in the center of buttons);
- fix spoiler click on title anchors elements. From now all a tags in title not close the spoiler (exlused the .close class element);
- fix spoiler max height limits;
- fix hide/show scroll on outbox;
- fix spoiler overflow hidden on active status;
- fix parallax false starting;
- fix tabs link into other elemets...Now recognized all annidated A tag " tabs>nav a " ;
- fix tabs not have start value active. now recognized it and start to active whe exist;
- fix button-number styling;
- fixed error button radio not check true/false;
- fixed user-select on input text;
- fixed button-checkbox & radio dot. Now have .after & .before;
- fixed one view errors when use mode app;
- fixed hide-bar cut elements on mobile or app;
- other little fixing;

#### <b>Upgrades:</b>

- /!\ IMPORTANT update \n
  Update reset concept - now div and span working better; --> read wiki on [Link](https://github.com/ShapeGroup/kimera-frontend-framework/wiki/API-::-CLASSES#--wide-and-partial-elements)

- /!\ IMPORTANT update \n
  Update vieport - now "model"; --> read wiki on [Link](https://github.com/ShapeGroup/kimera-frontend-framework/wiki/API-::-VIEWPORTS#basic-views-type)

- performance and stability improvements to outboxes in line with new view modes;
- introduced viewon-[on-off-off] for hide show elements on media query cuts... litterally: view on [ mobile - desktop - bigscreen ];
- on-mobile-show & hide, on-desktop-show & hide, on-bigscreen-show & hide is now deprecated;
- introduced new multiline ellipsis (It's experiment -> ellipsis-child-[4] 4 line of ellipsis);
- introduced media query float system (float-[bigscreen-mediumscreen-mobilescreen]> -> float-[left-right-off]>)
- from now outbox can start active on load of page.


#### <b>Ui system:</b>

- tab-y upgraded - now have close element;
- snap-X upgraded - now have new system.
    - 1  snaptype-wide is full width slider;
    - 2  snaptype-blocks is boxed width slider;

- checkbox & radio stability ugraded;
- span>button-text stability ugraded (input text is now relative);


#### <b>Extra:</b>

- reintroduce setmobile on button!
- change media query resolution cuts (new limits: mobile max 900px -> desktop max 1920px -> bigscreen from 1920px ) 


#### new Bug:

- Snaps with lock generates an error that blocks the drag action as well as the view.
- In some situations on mode-app the button-time center is disaligned. if you shake it stay where it is instead of staying in the clock.
- button-range does not work if loaded into an outbox O_O WFT???


```
https://github.com/ShapeGroup/kimera-frontend-framework
```

___
_Please! Create Issue for debug!_
