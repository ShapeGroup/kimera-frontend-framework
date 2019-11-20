
## 2.5.3-5 [<b>Release Notes</b>]
___

#### <b>BugFix:</b>
- fixed error "PanelTarget not exist";
- fixed error "Loader not exist";
- fixed drift and error on snap system;


#### <b>Upgrades:</b>

- Less.js via script have a new pipeline:<br/>From now on it is no longer possible to use the script code directly but compile it and copy it into a css file using a wizard.
- introduced explandible contents on Card class;
- introduced masonry grid system: grid-y is now mansonery grid;
- now grid-y split vertically grid-x equalizing the height gaps relative to adjacent boxes (it is not strictly necessary but it can, you can always use grid-x with box-100)
- speed up of loader and other page elements;
- built new class to lock a view in viewport-app;
- built new view-controller: now pointer items controller follow the view flow via [autostep] class;
- built new view-controller: now pointer items controller have a auto space via [autoset] class;
- parallax upgrade: from now on there are directions -> fx-xParallax, fx-yParallax, fx-Parallax;
- new snap system: Upgrade response; It's based on drag and not boxes; Dixed drift error and all issue.
- added follow labels and lock class for snap boxes

#### <b>Ui system:</b>
- nothing;

#### <b>Extra:</b>
- toTop is deprecated:<br />
  _The system had become complex to manage and almost completely useless. Just a simple still at the top of the page inserted in the footer to have the same effect._


```
https://github.com/ShapeGroup/kimera-frontend-framework
```

___
_Please! Create Issue for debug!_
