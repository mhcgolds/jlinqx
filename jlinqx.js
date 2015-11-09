/* 
Enchanced JavaScript Linq-like library

Márcio Chaves - marcio.chaves(at)gatec(dot)com(dot)br
Version 0.2 - 11.2015
https://github.com/mhcgolds/jlinqx

Under MIT License
*/

;

if (!$)
{
	var $ = null;
}

(function($, window)
{
	var _jlinq = function(e)
	{
		var _r = [],    // Registered functions
			_s = 0,     // Start index
			_e = null,  // End index
			_c = 0,     // Count
			_f = 0;     // Items found
			_o = null,  // Output format
			_x = [],    // Exceptions
			_d = [],    // Order functions
			_t = null,  // Type of the target object: 0 = array of values or 1 = array of objects
			_a = [],    // Additional functions to be executed at the end of ToArray
			_l = null,  // Log info
			_st = null, // Storage functions
			_j = false, // Flag for jQuery use
			_v = "0.2";
		
		// JSON string
		if (typeof(e) == "string")
		{
			e = JSON.parse(e);
		}
		
		_t = ((e && typeof(e[0]) == "object") ? 1 : 0);
		
		if (!e)
		{
			_j = true;
			e = $(this);
		}
		
		var _localManagement = function(data)
		{
			if (_st)
			{
				data = JSON.stringify(data);
				
				var fn = null;
					
				if (_st.t == 1)
				{
					fn = localStorage;
				}
				else 
				{
					fn = sessionStorage;
				}
				
				fn.setItem(_st.k, data);
			}
		}
		
		return {
			Where: function(fn)
			{
				_r.push(fn);
				
				return this;
			},
			
			Take: function(n)
			{
				_e = n;
				
				return this;
			},
			
			Skip: function(n)
			{
				_s = n;
				
				return this;
			},
			
			Select: function(fn)
			{
				_o = fn;
				
				return this;
			},
			
			First: function(fn)
			{
				_r.push(fn);
				
				return this.Take(1).Where(fn).ToArray();
			},
			
			Single: function(fn)
			{
				_r.push(fn);
				
				var res = this.Where(fn).ToArray();
				
				return !res.length ? res : false;
			},
			
			Last: function(fn)
			{
				_r.push(fn);
				var res = this.Where(fn).ToArray();
				
				return !res.length ? res : res[(res.length - 1)];
			},
			
			Any: function(fn)
			{
				var res = this.Where(fn).ToArray();
				
				return Boolean(_f);
			},
			
			ElementAt: function(n)
			{
				var r = this.ToArray();
				
				return r[n] ? r[n] : false;
			},
			
			Except: function(fn)
			{
				_x.push(fn);
				
				return this;
			},
			
			OrderBy: function(fn, d)
			{
				if (_t == 0 && !fn)
				{
					fn = (x) =>
					{
						return x;
					};
				}
				
				_d.push(
				{
					d: (!d ? 0 : d), // Direction: 0 = asc, 1 = desc
					fn: fn
				});
			
				return this;
			},
			
			OrderByDescending: function(fn)
			{
				return this.OrderBy(fn, 1);
			},
			
			Reverse: function()
			{
				_a.push(function(obj)
				{
					return obj.reverse();
				});
				
				return this;
			},
			
			Remove: function(opt)
			{
				// Remove by index
				if (typeof(opt) == "number")
				{
					_r.push((x, y) => y != opt);
				}
				// Remove by function result
				else if(typeof(opt) == "function")
				{
					_r.push(x => !opt(x));
				}
			
				return this;
			},
			
			Aggregate: function(opt)
			{
				var result = this.ToArray();
				
				if (result.length > 0)
				{
					var _current = typeof(result[0]) == "number" ? 0 : "";
						
					for (var i = 0; i < result.length; i++)
					{
						_current = opt(_current, result[i]);
					}
					
					return _current;
				}
				
				return null;
			},
			
			All: function(opt)
			{
				return e.length == (opt ? this.Where(opt) : this).ToArray().length;
			},
			
			Average: function(opt)
			{
				return this.Sum(opt) / e.length;
			},
			
			Intersect: function(opt)
			{
				console.info("Not implemented");
				return this;
			},
			
			Max: function(opt)
			{
				var result = this.OrderBy(opt).ToArray();
				
				return result[result.length - 1];
			},
			
			Min: function(opt)
			{
				var result = this.OrderBy(opt).ToArray();
				
				return result[0];
			},
			
			Sum: function(opt)
			{
				var sum = 0;
			
				if (_t == 0)
				{
					e.forEach(x => sum = (sum + Number(x)));
				}
				else 
				{
					e.forEach(x => sum+= opt(x));
				}
				
				return sum;
			},
			
			SkipWhile: function(opt)
			{
				console.info("Not implemented");
				return this;
			},
			
			TakeWhile: function(opt)
			{
				console.info("Not implemented");
				return this;
			},
			
			IndexOf: function(opt)
			{			
				if (_t == 0)
				{
					return this.ToArray().indexOf(opt);
				}
				else 
				{
					var index = -1;
					this.Each((i) =>
					{
						if (opt(this))
						{
							index = i;
							return false;
						}
					});
					
					return index;
				}
			},
			
			LastIndexOf: function(opt)
			{			
				if (_t == 0)
				{
					return this.ToArray().lastIndexOf(opt);
				}
				else 
				{
					var index = -1;
					this.Each((i) =>
					{
						if (opt(this))
						{
							index = i;
						}
					});
					
					return index;
				}
			},
			
			Count: function(opt)
			{
				var data = this;
				
				if (opt)
				{
					data = data.Where(opt);
				}
				
				return data.ToArray().length;
			},
			
			// Array only methods
			Concat: function(obj2)
			{
				if (_t == 0)
				{
					_a.push(function(obj)
					{
						return obj.concat(obj2);
					});
				}
				
				return this;
			},
			
			Distinct: function()
			{
				if (_t == 0)
				{
					_a.push(function(obj)
					{
						// http://stackoverflow.com/a/15868720/1267304
						return obj.reduce(function(a,b)
						{
							if (a.indexOf(b) < 0) 
							{
								a.push(b);
							}
							
							return a;
						}, []);
					});
				}
				
				return this;
			},
			
			Zip: function(obj2, fn)
			{
				if (_t == 0)
				{
					_a.push(function(obj)
					{
						var r = [];
						
						for (var i = 0; i < obj.length; i++)
						{
							if (obj2[i])
							{
								r.push(fn(obj[i], obj2[i]));
							}
						}
						
						return r;
					});
				}
			
				return this;
			},
			
			Union: function(obj2)
			{
				if (_t == 0)
				{
					_a.push(function(obj)
					{
						var r = obj.concat(obj2);
						
						this.Distinct();
						
						return r;
					});
				}
				
				return this;
			},
			
			// Ending methods
			ToArray: function()
			{
				var result = [];
				_c = 0;
				_f = 0;
				
				for (var i = _s; i < e.length; i++)
				{
					var ok = true;
					
					for (var n = 0; n < _r.length; n++)
					{
						if (!_r[n](e[i], i))
						{
							ok = false;
							break;
						}
						else if (_x.length > 0)
						{
							for (var x = 0; x < _x.length; x++)
							{
								if (_x[x](e[i]))
								{
									ok = false;
									break;
								}
							}
						}
					}
					
					if (ok)
					{
						_f++;
						
						if (!_o)
						{
							if (!_j)
							{
								result.push(e[i]);
							}
							else 
							{
								result.push($(e[i]));
							}
						}
						else 
						{
							result.push(_o(e[i]));
						}
					}
					
					_c++;
					
					if (_e && _c == _e)
					{
						break;
					}
				}
				
				if (result.length == 1)
				{
					result = result[0];
				}
				else if (_d.length > 0)
				{
					for (var i = 0; i < _d.length; i++)
					{
						result.sort(function(x, y)
						{
							return _d[i].d === 0 ?
								_d[i].fn(x) > _d[i].fn(y) :
								_d[i].fn(x) < _d[i].fn(y);
						});
					}
				}
				
				if (_a.length > 0)
				{
					for (var i = 0; i < _a.length; i++)
					{
						result = _a[i].call(this, result);
					}
				}
				
				_localManagement(result);
				
				if (_l)
				{
					_l.d ? console.log(_l.d, result) : console.log(result);
				}
				
				return result;
			},
			
			// Other Functions
			
			ToJSON: function()
			{
				return JSON.stringify(this.ToArray());
			},
			
			LocalSet: function(key)
			{
				_st = 
				{
					t: 1,
					k: key
				};
				
				return this;
			},
			
			SessionSet: function(key)
			{
				_st = 
				{
					t: 2,
					k: key
				};
				
				return this;
			},
			
			Log: function(d)
			{
				_l = { d: d };
				
				return this;
			},
			
			Each: function(fn)
			{
				var data = this.ToArray();
				
				for (var i = 0; i < data.length; i++)
				{
					if (fn.call(data[i], i, data) === false)
					{
						break;
					}
				}
			}
		};
	};

	// Static methods
	var _rGet = function(key, fn)
	{
		var data = fn.getItem(key);
		
		if (data)
		{
			return this(data);
		}
	};

	var _rRem = function(key, fn)
	{
		return fn.removeItem(key);
	}

	_jlinq.LocalGet = function(key)
	{
		return _rGet.call(this, key, localStorage);
	};

	_jlinq.SessionGet = function(key)
	{
		return _rGet.call(this, key, sessionStorage);
	};

	_jlinq.LocalRemove = function(key)
	{
		var data = _rGet.call(this, key, localStorage);
		_rRem(key, localStorage);
		
		return data;
	};

	_jlinq.SessionRemove = function(key)
	{
		var data = _rGet.call(this, key, sessionStorage);
		_rRem(key, sessionStorage);
		
		return data;
	};
	
	_jlinq.Version = function()
	{
		return this._v;
	}

	if ($)
	{
		$.fn.jlinq = _jlinq;
		
		$.extend({ jlinq: _jlinq });
	}
	else 
	{
		window.jlinq = _jlinq;
	}
})($, window);