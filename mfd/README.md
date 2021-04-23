## Windows from MFD mode:

#### 1. [Direct To](#Direct-To) (interactive)

![Direct To MFD](./img/direct-to-mfd.png)

#### 2. [Menu](#Menu)

![Menu MFD](./img/menu-mfd.png)

#### 3. [Flight Plan](#Flight-Plan) (interactive)

![Flight Plan MFD](./img/active-flight-plan-mfd.png)

#### 4. [Procedures](#Procedures)

![Procedures MFD](./img/procedures-mfd.png)

So, in MFD mode we have next windows:
- Direct To (interactive);
- Menu;
- Flight Plan:
    - WPT:
        - AirportInformation;
        - IntersectionInformation;
        - NdbInformation;
        - VorInformation;
        - UserWptInformation.
    - FPL:
        - ActiveFlightPlan:
            - ActiveFlightPlan (interactive);
            - WaypointInformation (interactive).
        - FlightPlanCatalog:
            - FlightPlanCatalog;
            - StoredFlightPlan;
            - WaypointInformation (interactive).
    - NRST:
        - NearestAirports;
        - NearestIntersections;
        - NearestNdb;
        - NearestVor;
        - NearestUserWpts;
        - NearestFrequencies;
        - NearestAirspaces.
- Procedures:
    - Select Approach;
    - Select Arrival.

In this mode we have 20 windows, 3 of them are interactive.

<hr>

## Direct To

This window have same logic like a Direct To from MFD mode. Only three  fields from sub window _IDENT, FACILITY, CITY_ have interactivity.

Direct To window:

![Direct To MFD](./img/direct-to-mfd.png)

Active Direct To window:

![Direct To active](./img/direct-to-active.png)

Animated Direct To window:

![Direct To animated](./img/direct-to-animated.gif)

<hr>

## Menu

Now this menu doesn't have interactivity and do nothibg. This menu only render React state. React state example:

Menu window:

![Menu MFD](./img/menu-mfd.png)

```js
{
    title: 'Cancel Direct-To NAV',
    available: false,
    active: false,
}, {
    title: 'Clear Vertical Constraints',
    available: false,
    active: false,
}, {
    title: 'Edit Hold',
    available: false,
    active: false,
}, {
    title: 'Hold At Present Position',
    available: true,
    active: true,
}
```

<hr>

## Procedures

This window have three children window (but was do only two, because they was same). Nothing from this windows don't have interactivity.

This windows will have more informacion, because here should be scroll. Now you can set in the React state the number of lines by which you need to scroll the information in the sub window.

Also in this windows will show modal windows.

Procedures window:

![Procedures MFD](./img/procedures-mfd.png)

Procedures Select Approach window:

![Procedures Select Approach](./img/procedures-approach.png)

Procedures Select Arrival window:

![Procedures Select Approach](./img/procedures-arrival.png)

<hr>

## Flight Plan

Flight Plan menu will description in the last one, because thim menu have the most difficult logic and the most menu windows.

User can switch between Flight Plan windows. Example on the gif below:

![Flight Plan menu anumated](./img/flight-plan-menu-animated.gif)

Flight Plan have 14 menu windows. More windows have scroll looks like procedures windows.

#### Menu windows from WPT:

Airport Information:

![Flight Plan Airport Information](./img/flight-plan-airport-information.png)

Intersection Information:

![Flight Plan Intersection Information](./img/flight-plan-intersection-information.png)

Ndb Information:

![Flight Plan Ndb Information](./img/flight-plan-ndb-information.png)

Vor Information:

![Flight Plan Vor Information](./img/flight-plan-vor-information.png)

User Wpt Information:

![Flight Plan User Wpt Information](./img/flight-plan-user-wpt-information.png)

#### Menu windows from FPL:

Active Flight Plan:

![Flight Plan Active Flight Plan](./img/flight-plan-active-flight-plan.png)

Flight Plan Catalog:

![Flight Plan Plan Catalog](./img/flight-plan-flight-plan-catalog.png)

#### Menu windows from NRST:

Nearest Airports:

![Flight Plan Nearest Airports](./img/flight-plan-nearest-airports.png)

Nearest Intersections:

![Flight Plan Nearest Intersections](./img/flight-plan-nearest-intersection.png)

Nearest Ndb:

![Flight Plan Nearest Ndb](./img/flight-plan-nearest-ndb.png)

Nearest Vor:

_Like a Nearest Ndb_

Nearest User Wpts:

![Flight Plan Nearest User Wpts](./img/flight-plan-nearest-user-wpts.png)

Nearest Frequencies:

![Flight Plan Nearest Frequencies](./img/flight-plan-nearest-frequencies.png)

Nearest Airspaces:

![Flight Plan Nearest Airspaces](./img/flight-plan-nearest-airspaces.png)


Only windows from FPL have logic and interactive. Write about this more.

#### Active Flight Plan:

> You can see code of this window [here](./code-example).

This is the most difficult window from all project. Empty window looks like this:

![Active Flight Plan empty](./img/active-flight-plan-empty.png)

User can add some information to this window:

![Active Flight Plan waypoint](./img/active-flight-plan-waypoint.png)

And this window will looks like this:

![Active Flight Plan data part](./img/active-flight-plan-data-part.png)

User can also add grouped information from [Procedures](#Procedures) window (now we don't have this functionality, but in future will implement). If user will add some information, window Active Flight Plan will looks like this:

![Flight Plan MFD](./img/active-flight-plan-mfd.png)

In code all data save in React state and arrays. You can write any data in any group and alghoritm will calculate coordinates X and Y for drawing text. If any group will missing, this group will don't show with title. Few examples:

<details>
    <summary>Window example:</summary>

```js
const arrivalData = [
    {
        text: 'Arrival - WAAA-PINTO.DELTA.ALL'
    },
    {
        text: ['RINTO'],
        dtk: dtkDefaultStr,
        dis: disDefaultStr,
        alt: altDefaultStr
    },
    {
        text: ['00MK3'],
        dtk: dtkDefaultStr,
        dis: disDefaultStr,
        alt: altDefaultStr
    },
    {
        text: ['MK60B'],
        dtk: dtkDefaultStr,
        dis: disDefaultStr,
        alt: altDefaultStr
    },
    {
        text: ['MKS'],
        dtk: dtkDefaultStr,
        dis: disDefaultStr,
        alt: altDefaultStr
    },
]

const approachData = [
    {
        text: 'VTF Apr - ME49-GPS 198° LNAV'
    },
    {
        text: ['HAXUS'],
        dtk: '',
        dis: '',
        alt: ''
    },
    {
        text: ['HASMO', 'faf'],
        dtk: 198,
        dis: '2.7',
        alt: 2600
    },
    {
        text: ['WUBIM', 'map'],
        dtk: 198,
        dis: '2.0',
        alt: ''
    },
    {
        text: ['1500FT'],
        dtk: 198,
        dis: '0.5',
        alt: 1500
    },
    {
        text: ['ZUBAR', 'mahp'],
        dtk: '',
        dis: '',
        alt: 4600
    },
    {
        text: ['HOLD'],
        dtk: 198,
        dis: '4.0',
        alt: ''
    },
]

const departureData = [
    {
        text: 'Departure - HAAB-RW07L.ASOL1A.ASOLE'
    },
    {
        text: ['RW07L'],
        dtk: '',
        dis: '',
        alt: ''
    },
    {
        text: ['8060FT'],
        dtk: 102,
        dis: '5781',
        alt: 8060
    },
    {
        text: ['D077S'],
        dtk: 103,
        dis: '18.4',
        alt: '12500'
    },
]

const [dataStore, setDataStore] = useState([
    {
        text: getDefaultTitleValue(),
        active: true,
        width: 200,
        coordinates: { x: 10, y: 0 }
    },
    {
        text: ['K'],
        dtk: '',
        dis: '',
        alt: ''
    },
    {
        text: ['M'],
        dtk: dtkDefaultStr,
        dis: disDefaultStr,
        alt: altDefaultStr
    },
    {
        text: [defaultAirportValue],
        active: false,
        width: 110
    },
])
```

![Flight Plan MFD](./img/active-flight-plan-mfd.png)
    
</details>


<details>
    <summary>Window example:</summary>

```js
const arrivalData = [ ]

const approachData = [
    {
        text: 'VTF Apr - ME49-GPS 198° LNAV'
    },
    {
        text: ['HAXUS'],
        dtk: '',
        dis: '',
        alt: ''
    },
    {
        text: ['HASMO', 'faf'],
        dtk: 198,
        dis: '2.7',
        alt: 2600
    },
    {
        text: ['WUBIM', 'map'],
        dtk: 198,
        dis: '2.0',
        alt: ''
    },
    {
        text: ['1500FT'],
        dtk: 198,
        dis: '0.5',
        alt: 1500
    },
    {
        text: ['ZUBAR', 'mahp'],
        dtk: '',
        dis: '',
        alt: 4600
    },
    {
        text: ['HOLD'],
        dtk: 198,
        dis: '4.0',
        alt: ''
    },
]

const departureData = [
    {
        text: 'Departure - HAAB-RW07L.ASOL1A.ASOLE'
    },
    {
        text: ['RW07L'],
        dtk: '',
        dis: '',
        alt: ''
    },
    {
        text: ['8060FT'],
        dtk: 102,
        dis: '5781',
        alt: 8060
    },
    {
        text: ['D077S'],
        dtk: 103,
        dis: '18.4',
        alt: '12500'
    },
]

const [dataStore, setDataStore] = useState([
    {
        text: getDefaultTitleValue(),
        active: true,
        width: 200,
        coordinates: { x: 10, y: 0 }
    },
    {
        text: ['K'],
        dtk: '',
        dis: '',
        alt: ''
    },
    {
        text: ['M'],
        dtk: dtkDefaultStr,
        dis: disDefaultStr,
        alt: altDefaultStr
    },
    {
        text: [defaultAirportValue],
        active: false,
        width: 110
    },
])
```

![Active Flight Plan part 1](./img/active-flight-plan-part-1.png)
</details>


<details>
    <summary>Window example:</summary>

```js
const arrivalData = []

const approachData = [ ]

const departureData = [
    {
        text: 'Departure - HAAB-RW07L.ASOL1A.ASOLE'
    },
    {
        text: ['RW07L'],
        dtk: '',
        dis: '',
        alt: ''
    },
    {
        text: ['8060FT'],
        dtk: 102,
        dis: '5781',
        alt: 8060
    },
    {
        text: ['D077S'],
        dtk: 103,
        dis: '18.4',
        alt: '12500'
    },
]

const [dataStore, setDataStore] = useState([
    {
        text: getDefaultTitleValue(),
        active: true,
        width: 200,
        coordinates: { x: 10, y: 0 }
    },
    {
        text: ['K'],
        dtk: '',
        dis: '',
        alt: ''
    },
    {
        text: ['M'],
        dtk: dtkDefaultStr,
        dis: disDefaultStr,
        alt: altDefaultStr
    },
    {
        text: [defaultAirportValue],
        active: false,
        width: 110
    },
])
```

![Active Flight Plan part 2](./img/active-flight-plan-part-2.png)
</details>


<details>
    <summary>Window example:</summary>

```js
const arrivalData = []

const approachData = [ ]

const departureData = [ ]

const [dataStore, setDataStore] = useState([
    {
        text: getDefaultTitleValue(),
        active: true,
        width: 200,
        coordinates: { x: 10, y: 0 }
    },
    {
        text: ['K'],
        dtk: '',
        dis: '',
        alt: ''
    },
    {
        text: ['M'],
        dtk: dtkDefaultStr,
        dis: disDefaultStr,
        alt: altDefaultStr
    },
    {
        text: [defaultAirportValue],
        active: false,
        width: 110
    },
])
```

![Active Flight Plan part 3](./img/active-flight-plan-part-3.png)
</details>


#### Flight Plan Catalog:

In this window user can set and see catalog with flight plan. 

![Flight Plan Catalog](./img/flight-plan-catalog.png)

Each line looks like as Active Flight Plan. This window have same logic. User select line and set in this line flight plan like as in Active Flight Plan. After select line show next window:

![Flight Plan Catalog stored](./img/flight-plan-catalog-stored.png)

If user want add point to Stored Flight Plan, he will see Waypoint Window:

![Flight Plan Catalog waypoint](./img/flight-plan-catalog-waypoint.png)

After added point this item will add to Stored Flight Plan. After fill Stored Flight Plan he will show in Flight Plan Catalog.

<hr>

[Back](https://github.com/tppd67421/G1000-menu)

[Prev - PFD mode](./../pfd/README.md)
