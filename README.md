jLinqX
=======

Enchanced JavaScript LINQ-like library(plus additional features)

[Check this @ Github pages](http://mhcgolds.github.io/jlinqx/)

### About the library

Different from others linq-style JavaScript libraries, this library (really) implements [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) which makes it get closer to the C# lambda feature. It doesn't need to parse and eval strings to simulate lambda or any other work around. Further, some other features regarding JavaScript objects that are useful nowadays were implemented as a plus to the object management, like local/sessionStorage management and built-in console.log() helper.

### ECMA6

[ECMAScript 6th Edition](http://en.wikipedia.org/wiki/ECMAScript#ECMAScript_Harmony_.286th_Edition.29)(aka "Harmony" or "ES.Next") is just a specification to be implemented by the browsers engines(that current run the 5th version) which means that the implementation depends on each engine to be finished. This library only uses "arrow functions" of this news ECMA version, so, if your browser supports it, it will be ok to run this lib on it.

#### Running/Enabling

You browser must support "arrow functions" which is a new feature of ECMAScript 6. Firefox already supports it. For Chrome, check out [this post](http://stackoverflow.com/a/24011617/1267304). IE, Safari and Opera still doesn't supports it. Check out if your browser supports it in [this table](http://kangax.github.io/compat-table/es6/).

### Initialization

Start jlinq passing either an object, array or a string with json.

    // Using with an object
    var data = [
        { Name: "Marcio", Age: 26 },
        { Name: "Teste", Age: 30 }, 
        { Name: "Outro teste", Age: 15 } 
    ];
    feainq(data)
    
    // Using with an array
    feainq([1, 2, 3, 4, 5])
    
    // Using with a string with json content
    feainq('[{"Name":"Marcio","Age":26},{"Name":"Teste","Age":30},{"Name":"Outro teste","Age":15}]');
	
### Methods

**Aggregate**(_fn_): [_object_]. Returns the result of the aggregate function. Only works with string or numbers.

    jlinq("the quick brown fox jumps over the lazy dog".split(" ")).Aggregate((workingSentence, next) => { return next + " " + workingSentence; })
	
**All**(_c-fn_): [_bool_]. Check if all elements of the collection matchs the given condition.

    jlinq(data).All((x) => x.Age > 1)
	
**Any**(_c-fn_): [_bool_]. Returns true or false if any item is found in the collection by the given condition. Can be called w/o condition as well.

    jlinq(data).Any(x => x.Age == 16)
	
**Average**(_[p]_): [_number_]. Returns the result average from an array of numbers or a numeric property.

    jlinq([1,2,3,4]).Average()

    jlinq(data).Average(x => x.Age)
	
**Count**(_[fn]_): [_number_]. Returns the total count of the matched items in the collection.

    jlinq(data).Count(x => x.Age > 20)

    jlinq([1,2,3,4]).Count()
	
**ElementAt**(_n_): [_object/bool_]. Returns the item on the position of the given index. Returns false if the index is out of range.

    // Using JS native .contains()
    jlinq(data).Where(x => x.Name.contains("este")).ElementAt(1)
	
**Except**(_c-fn_): [_Chainable_]. Multiple. Same as Where but in the other way. It excludes the matched items.

    jlinq(data).Where(x => x.Age > 1).Except(x => x.Name == "Marcio").ToArray()
	
**First**(_c-fn_): [_object/array_]. Returns the first item of the given condition. If none is found returns an empty collection.

    jlinq(data).First(x => x.Age > 15).Name
	
**IndexOf**(_c-fn/number_): [_number_]. Returns the index of the matched element. Returns -1 if none is found.

    jlinq(data).IndexOf(x => x.Age == 15)

    // For array
    jlinq([1,2,3].IndexOf(2)
	
**Last**(_c-fn_): [_object/array_]. Returns the last item of the given condition. If none is found, returns an empty collection.

	jlinq(data).Last(x => x.Name == "Teste").Age
	
**LastIndexOf**(_c-fn/number_): [_number_]. Returns the index of the last matched element. Returns -1 if none is found.

	jlinq([1,2,3,1,2,3,1,2,3]).LastIndexOf(1)

    // For objects
    jlinq(data).LastIndexOf(x => x.Age == 15)
	
**Max**(_[p]_): [_number_]. Returns the maximum value of the given array or property.

	jlinq(data).Max(x => x.Age)

	jlinq([7,3,5,8,4]).Max()
	
**Min**(_[p]_): [_number_]. Returns the minimum value of the given array or property.

	jlinq(data).Min(x => x.Age)
	
	jlinq([7,3,5,8,4]).Min()
	
**OrderBy**(_c-fn/p, [bool]_): [_Chainable_]. Multiple. Orders the collection. Expects an function or an property. Can be nested so its excludes the .ThenBy(), e.g. .OrderBy(x => x.Name).OrderBy(x => x.Age) will be like .OrderBy(x => x.Name).ThenBy(x => x.Age). Receives an second parameter to act like .OrderByDescending(), so .OrderBy(x => x.Name, true) is the same as .OrderByDescending(x => x.Name).

	jlinq(data).OrderBy(x => x.Name).ToArray()

	jlinq(data).OrderBy(x => parseInt(x.Age), true).ToArray()
	
**OrderByDescending**(_c-fn/p_): [_Chainable_]. Multiple. Same as OrderBy(), but orders by descending order.

    // Using JS native parseInt()
    jlinq(data).OrderByDescending(x => parseInt(x.Age)).ToArray()
	
**Remove**(_c-fn/n_): [_Chainable_]. Multiple. Remove the matched item by the given function or the given index.

    jlinq(data).Remove(x => x.Age > 20).ToArray()
    
    jlinq(data).Remove(1).ToArray()
	
**Reverse**(): [_Chainable_]. Single. Reverses the collection.

	jlinq(data).OrderBy(x => x.Name).Reverse().ToArray()
	
**Select**(_fn_): [_Chainable_]. Single. Format the result by the given function.

	// Select with a function
    jlinq(data).Where(x => x.Name == "Teste" || x.Age == 26).Select(x => 
    {
        return { Person: x.Name + " (" + x.Age + ")" }
    }).ToArray()
	
**Single**(_c-fn_): [_object/bool_]. Same as First but returns false if none is found.

	jlinq(data).Single(x => x.Age == 15).Name
	
**Skip**(_n_): [_Chainable_]. Single. Forwards the result skipping n of the matched filters.

	jlinq(data).Skip(1).ToArray()
	
**Sum**(_[p]_): [_number_]. Returns the sum of the values of the given array or property.

	jlinq([1,2,3,4]).Sum()

	jlinq(data).Sum(x => x.Age)
	
**Take**(_n_): [_Chainable_]. Single. Limits the result.

    jlinq(data).Take(1).ToArray()
        
    jlinq(data).Skip(1).Take(1).ToArray()
	
**Where**(_c-fn_): [_Chainable_]. Multiple. Adds a condition to the result.

	jlinq(data).Where(x => x.Name == "Teste").ToArray()
	
#### Chaing ending methods

**ToArray**(): Returns the result of the method chaining as an array.

	jlinq(data).ToArray()
	
**ToJSON**(): Stringifies(JSON.stringify) the result of .ToArray(ToArray() is called by JSON itself, no need to call it too).

	jlinq(data).Where(x => x.Age > 20).ToJSON()
	
#### Array only methods

**Concat**(_array_): [_Chainable_]. Multiple. Concats an array to the given array.

	jlinq([1,2,3,4]).Concat([5,6,7,8]).ToArray()
	
**Distinct**(): [_Chainable_]. Single. Removes the duplicate values(not valid for arrays of objects).

	jlinq([1,2,3,3,4,5,5,6,2]).Distinct().ToArray()
	
**Union**(_array_): [_Chainable_]. Multiple. Concat the given array but removing the duplicate values(not valid for arrays of objects).

	jlinq([1,2,3,3]).Union([2,1,4]).ToArray()
	
**Zip**(_array, fn_): [_Chainable_]. Multiple. Same as Concat, but runs the given function for both arrays in same position passing their respective values as parameters. The result is the function returned values.

	jlinq([1,2,3,4]).Zip([5,6,7,8], (x, y) => { return x + y }).ToArray()
	
#### Utilities

**Log**(_[string]_): [_Chainable_]. Single. Prints to the console the result of the ToArray/ToJSON with the given message(if given).

	jlinq(data).Log("#26 Log this!").Where(x => x.Age > 20).ToArray();
	
**Each**(_fn_): [_void_]. Perform an each loop on the result of ToArray(calls ToArray() by itself, no need to call it too) calling the given function.

    jlinq(data).Each(index => 
    { 
        if (this.Name == "Teste") return false; 
        else console.log("#27 Each", this) 
    });
	
#### Storage utilities

##### Set methods

**LocalSet**(_string_): [_Chainable_]. Single. Inserts/Updates the given key to the browser resource's localStorage with the result of the .ToArray(don't calls ToArray()).

	jlinq(data).LocalSet("dados").ToArray()
	
**SessionSet**(_string_): [_Chainable_]. Single. Same as LocalSet but in the sessionStorage.

	jlinq(data).SessionSet("dados").ToArray()
	
Note that must be called just one of LocalSet or SessionSet in the same chaining.

##### Get/Remove methods(Static methods)

**LocalGet**(_string_): Gets the object in the localStorage by the given key.

	jlinq.LocalGet("dados").ToArray()
	
**SessionGet**(_string_): Same as LocalGet but in the sessionStorage.

	jlinq.SessionGet("dados").ToArray()
	
**LocalRemove**(_string_): Removes the object in the localStorage by the given key and returns it.

	jlinq.LocalRemove("dados").ToArray()
	
**SessionRemove**(_string_): Same as LocalRemove but in the sessionStorage.

	jlinq(data).Any(x => x.Age == 16)
	
#### jQuery compability

If there is jQuery in your project, jLinqX will automatically(no need to include any plugins) work with its selectors. Just use like, e.g.:

$("any-selector").jlinq().Where()

$("any-selector").filter('').jlinq().Any()
	
### Summary

**MethodName**(_param1,param2,paramN,[optionalParam]_): [_Chainable/Stub_]. Single/Multiple. Description.

- MethodName: The method(function) name;
- Params: _[param]_ = Optional param; _typeA/typeB_ = Must be given or A or B; _fn_ = A function;_c-fn_ = A conditional function. Must return a boolean; _n_ = A number; _p_ = A parameter. e.g: x => x.Name;
- Chainable/Stub: Chainable methods means that its not ended yet. These methods must be ended with .ToArray() or .ToJSON(); Stub methods means end-of-line methods, they will return something;
- Single/Multiple: A Single method means that it should be called just once in the chain. There is no meaning on calling it twice. Multiple methods can be called how many times developer wants. If the method isn't chainable, it will be a stub by default.
- Description: A description of the method purpose.

Under MIT License.
