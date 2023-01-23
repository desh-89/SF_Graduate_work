"use strict";
MiniProfiler.templates = {};
MiniProfiler.templates["profilerTemplate"] = function anonymous(it
) {
var out=' <div class="profiler-result"> <div class="profiler-button ';if(it.has_duplicate_sql_timings){out+='profiler-warning';}out+='"> ';if(it.has_duplicate_sql_timings){out+='<span class="profiler-nuclear">!</span>';}out+=' <span class="profiler-number"> '+( MiniProfiler.formatDuration(it.duration_milliseconds))+' <span class="profiler-unit">ms</span> </span> ';if(MiniProfiler.showTotalSqlCount()){out+=' <span class="profiler-number"> '+( it.sql_count)+' <span class="profiler-unit">sql</span> </span> ';}out+=' </div> <div class="profiler-popup"> <div class="profiler-info"> <span class="profiler-name"> '+( it.name)+' <span class="profiler-overall-duration">('+( MiniProfiler.formatDuration(it.duration_milliseconds))+' ms)</span> </span> <span class="profiler-server-time">'+( it.machine_name)+' on '+( MiniProfiler.renderDate(it.started_formatted))+'</span> </div> <div class="profiler-output"> <table class="profiler-timings"> <thead> <tr> <th>event</th> <th>duration (ms)</th> <th class="profiler-duration-with-children">with children (ms)</th> <th class="time-from-start">from start (ms)</th> ';if(it.has_sql_timings){out+=' <th colspan="2">query time (ms)</th> ';}out+=' ';var arr1=it.custom_timing_names;if(arr1){var value,i1=-1,l1=arr1.length-1;while(i1<l1){value=arr1[i1+=1];out+=' <th colspan="2">'+( value.toLowerCase() )+' (ms)</th> ';} } out+=' </tr> </thead> <tbody> '+( MiniProfiler.templates.timingTemplate({timing: it.root, page: it}) )+' </tbody> <tfoot> <tr> <td colspan="3"> ';if(!it.client_timings){out+=' '+( MiniProfiler.templates.linksTemplate({timing: it.root, page: it}) )+' ';}out+=' <a class="profiler-toggle-duration-with-children" title="toggles column with aggregate child durations">show time with children</a> <a class="profiler-snapshots-page-link" title="Go to snapshots page" href="'+( MiniProfiler.options.path )+'snapshots">snapshots</a> </td> ';if(it.has_sql_timings){out+=' <td colspan="2" class="profiler-number profiler-percent-in-sql" title="'+( MiniProfiler.getSqlTimingsCount(it.root) )+' queries spent '+( MiniProfiler.formatDuration(it.duration_milliseconds_in_sql) )+' ms of total request time"> '+( MiniProfiler.formatDuration(it.duration_milliseconds_in_sql / it.duration_milliseconds * 100) )+' <span class="profiler-unit">% in sql</span> </td> ';}out+=' ';var arr2=it.custom_timing_names;if(arr2){var value,i2=-1,l2=arr2.length-1;while(i2<l2){value=arr2[i2+=1];out+=' <td colspan="2" class="profiler-number profiler-percentage-in-sql" title="'+( it.custom_timing_stats[value].count )+' '+( value.toLowerCase() )+' invocations spent '+( MiniProfiler.formatDuration(it.custom_timing_stats[value].duration) )+' ms of total request time"> '+( MiniProfiler.formatDuration(it.custom_timing_stats[value].duration / it.duration_milliseconds * 100) )+' <span class="profiler-unit">% in '+( value.toLowerCase() )+'</span> </td> ';} } out+=' </tr> </tfoot> </table> ';if(it.client_timings){out+=' <table class="profiler-timings profiler-client-timings"> <thead> <tr> <th>client event</th> <th>duration (ms)</th> <th>from start (ms)</th> </tr> </thead> <tbody> ';var arr3=MiniProfiler.getClientTimings(it.client_timings);if(arr3){var value,i3=-1,l3=arr3.length-1;while(i3<l3){value=arr3[i3+=1];out+=' <tr class="';if(value.isTrivial){out+='profiler-trivial';}out+='"> <td class="profiler-label">'+( value.name )+'</td> <td class="profiler-duration"> ';if(value.duration >= 0){out+=' <span class="profiler-unit"></span>'+( MiniProfiler.formatDuration(value.duration) )+' ';}out+=' </td> <td class="profiler-duration time-from-start"> <span class="profiler-unit">+</span>'+( MiniProfiler.formatDuration(value.start) )+' </td> </tr> ';} } out+=' </tbody> <tfoot> <td colspan="3"> '+( MiniProfiler.templates.linksTemplate({timing: it.root, page: it}) )+' </td> </tfoot> </table> ';}out+=' ';if(it.custom_fields && Object.keys(it.custom_fields).length > 0){out+=' <p class="custom-fields-title">Snapshot custom fields</p> <table class="profiler-timings"> <tbody> ';var arr4=Object.keys(it.custom_fields);if(arr4){var key,i4=-1,l4=arr4.length-1;while(i4<l4){key=arr4[i4+=1];out+=' <tr> <td class="profiler-label">'+( key )+'</td> <td class="profiler-label">'+( it.custom_fields[key] )+'</td> </tr> ';} } out+=' </tbody> </table> ';}out+=' </div> </div> ';if(it.has_sql_timings){out+=' <div class="profiler-queries"> <table> <thead> <tr> <th class="ta-right">step<br />time from start<br />query type<br />duration</th> <th class="ta-left">call stack<br />query</th> </tr> </thead> <tbody> ';var arr5=MiniProfiler.getSqlTimings(it.root);if(arr5){var value,index=-1,l5=arr5.length-1;while(index<l5){value=arr5[index+=1];out+=' '+( MiniProfiler.templates.sqlGapTemplate({g: value.prevGap}) )+' '+( MiniProfiler.templates.sqlTimingTemplate({i: index, s: value}) )+' ';if(value.nextGap){out+=' '+( MiniProfiler.templates.sqlGapTemplate({g: value.nextGap}) )+' ';}out+=' ';} } out+=' </tbody> </table> <p class="profiler-trivial-gap-container"> <a class="profiler-toggle-trivial-gaps">show trivial gaps</a> </p> </div> ';}out+=' </div>';return out;
}
MiniProfiler.templates["linksTemplate"] = function anonymous(it
) {
var out=' <a href="'+( MiniProfiler.shareUrl(it.page.id) )+'" class="profiler-share-profiler-results" target="_blank">share</a> <a href="'+( MiniProfiler.moreUrl(it.timing.name) )+'" class="profiler-more-actions">more</a> ';if(it.page.has_flamegraph){out+=' <a href="'+( MiniProfiler.flamegraphUrl(it.page.id) )+'" class="profiler-show-flamegraph" target="_blank">flamegraph</a> ';}out+=' ';if(it.custom_link){out+=' <a href="'+( it.custom_link )+'" class="profiler-custom-link" target="_blank">'+( it.custom_link_name )+'</a> ';}out+=' ';if(it.page.has_trivial_timings){out+=' <a class="profiler-toggle-trivial" data-show-on-load="'+( it.page.has_all_trivial_timings )+'" title="toggles any rows with &lt; '+( it.page.trivial_duration_threshold_milliseconds )+' ms"> show trivial </a> ';}return out;
}
MiniProfiler.templates["timingTemplate"] = function anonymous(it
) {
var out=' <tr class="';if(it.timing.is_trivial){out+='profiler-trivial';}out+='" data-timing-id="'+( it.timing.id )+'"> <td class="profiler-label" title="';if(it.timing.name && it.timing.name.length > 45){out+=''+( it.timing.name );}out+='"> <span class="profiler-indent">'+( MiniProfiler.renderIndent(it.timing.depth) )+'</span> '+( it.timing.name.slice(0,45) );if(it.timing.name && it.timing.name.length > 45){out+='...';}out+=' </td> <td class="profiler-duration" title="duration of this step without any children\'s durations"> '+( MiniProfiler.formatDuration(it.timing.duration_without_children_milliseconds) )+' </td> <td class="profiler-duration profiler-duration-with-children" title="duration of this step and its children"> '+( MiniProfiler.formatDuration(it.timing.duration_milliseconds) )+' </td> <td class="profiler-duration time-from-start" title="time elapsed since profiling started"> <span class="profiler-unit">+</span>'+( MiniProfiler.formatDuration(it.timing.start_milliseconds) )+' </td> ';if(it.timing.has_sql_timings){out+=' <td class="profiler-duration ';if(it.timing.has_duplicate_sql_timings){out+='profiler-warning';}out+='" title="';if(it.timing.has_duplicate_sql_timings){out+='duplicate queries detected - ';}if(it.timing.executed_readers > 0 || it.timing.executed_scalars > 0 || it.timing.executed_non_queries > 0){out+=''+( it.timing.executed_readers )+' reader, '+( it.timing.executed_scalars )+' scalar, '+( it.timing.executed_non_queries )+' non-query statements executed';}out+='"> <a class="profiler-queries-show"> ';if(it.timing.has_duplicate_sql_timings){out+='<span class="profiler-nuclear">!</span>';}out+=' '+( it.timing.sql_timings.length )+' <span class="profiler-unit">sql</span> </a> </td> <td class="profiler-duration" title="aggregate duration of all queries in this step (excludes children)"> '+( MiniProfiler.formatDuration(it.timing.sql_timings_duration_milliseconds) )+' </td> ';}else{out+=' <td colspan="2"></td> ';}out+=' ';var arr1=it.page.custom_timing_names;if(arr1){var value,i1=-1,l1=arr1.length-1;while(i1<l1){value=arr1[i1+=1];out+=' ';if(it.timing.custom_timings && it.timing.custom_timings[value]){out+=' <td class="profiler-duration" title="aggregate number of all '+( value.toLowerCase() )+' invocations in this step (excludes children)"> '+( it.timing.custom_timings[value].length )+' '+( value.toLowerCase() )+' </td> <td class="profiler-duration" title="aggregate duration of all '+( value.toLowerCase() )+' invocations in this step (excludes children)"> '+( MiniProfiler.formatDuration(it.timing.custom_timing_stats[value].duration) )+' </td> ';}else{out+=' <td colspan="2"></td> ';}out+=' ';} } out+=' </tr> ';if(it.timing.has_children){out+=' ';var arr2=it.timing.children;if(arr2){var value,i2=-1,l2=arr2.length-1;while(i2<l2){value=arr2[i2+=1];out+=' '+( MiniProfiler.templates.timingTemplate({timing: value, page: it.page}) )+' ';} } out+=' ';}return out;
}
MiniProfiler.templates["sqlTimingTemplate"] = function anonymous(it
) {
var out=' <tr class="'+( it.s.row_class || '' )+'" data-timing-id="'+( it.s.parent_timing_id )+'"> <td class="profiler-info"> <div>'+( it.s.parent_timing_name )+'</div> <div class="profiler-number"><span class="profiler-unit">T+</span>'+( MiniProfiler.formatDuration(it.s.start_milliseconds) )+' <span class="profiler-unit">ms</span></div> <div> ';if(it.s.is_duplicate){out+='<span class="profiler-warning">DUPLICATE</span>';}out+=' '+( MiniProfiler.renderExecuteType(it.s.execute_type) )+' </div> <div title="';if(it.s.execute_type == 3){out+='first result fetched: '+( it.s.first_fetch_duration_milliseconds )+'ms';}out+='">'+( MiniProfiler.formatDuration(it.s.duration_milliseconds) )+' <span class="profiler-unit">ms</span></div> </td> <td> <div class="query"> <pre class="profiler-stack-trace">'+( it.s.stack_trace_snippet )+'</pre> ';if(it.s.formatted_command_string){out+=' <pre class="prettyprint lang-sql"><code>'+( it.s.formatted_command_string )+'; '+( MiniProfiler.formatParameters(it.s.parameters) )+'</code></pre> ';}else{out+=' <i>Query redacted</i> ';}out+=' </div> </td> </tr>';return out;
}
MiniProfiler.templates["sqlGapTemplate"] = function anonymous(it
) {
var out=' <tr class="profiler-gap-info';if(it.g.duration < 4){out+=' profiler-trivial-gaps';}out+='"> <td class="profiler-info"> '+( it.g.duration )+' <span class="profiler-unit">ms</span> </td> <td class="query"> <div>'+( it.g.topReason.name )+' &mdash; '+( it.g.topReason.duration.toFixed(2) )+' <span class="profiler-unit">ms</span></div> </td> </tr>';return out;
}
MiniProfiler.templates["snapshotsGroupsList"] = function anonymous(it
) {
var out=' ';if(it.list && it.list.length){out+=' <table class="snapshots-table"> <thead> <tr> <th>Requests Group</th> <th>Worst Time (ms)</th> <th>Best Time (ms)</th> <th>No. of Snapshots</th> </tr> </thead> <tbody> ';var arr1=it.list;if(arr1){var row,i1=-1,l1=arr1.length-1;while(i1<l1){row=arr1[i1+=1];out+=' <tr> <td class="request-group"><a href="'+( row.url )+'">'+( row.name )+'</a></td> <td>'+( MiniProfiler.formatDuration(row.worst_score) )+'</td> <td>'+( MiniProfiler.formatDuration(row.best_score) )+'</td> <td>'+( row.snapshots_count )+'</td> </tr> ';} } out+=' </tbody> </table> ';}else{out+=' <h2>No snapshots exist</h2> ';}return out;
}
MiniProfiler.templates["snapshotsList"] = function anonymous(it
) {
var out=' '; var data = it.data; out+=' '; var customFieldsNames = it.allCustomFieldsNames; out+=' ';if(data.list && data.list.length){out+=' <h2>Snapshots for '+( data.group_name )+'</h2> <table class="snapshots-table"> <thead> <tr> <th>ID</th> <th>Duration (ms)</th> <th>SQL Count</th> ';var arr1=customFieldsNames;if(arr1){var name,i1=-1,l1=arr1.length-1;while(i1<l1){name=arr1[i1+=1];out+=' <th>'+( name )+'</th> ';} } out+=' <th>Age</th> </tr> </thead> <tbody> ';var arr2=data.list;if(arr2){var row,i2=-1,l2=arr2.length-1;while(i2<l2){row=arr2[i2+=1];out+=' <tr> <td><a href="'+( row.url )+'"> '+( row.id )+' </a></td> <td>'+( MiniProfiler.formatDuration(row.duration) )+'</td> <td>'+( row.sql_count )+'</td> ';var arr3=customFieldsNames;if(arr3){var name,i3=-1,l3=arr3.length-1;while(i3<l3){name=arr3[i3+=1];out+=' <td>'+( row.custom_fields[name] || "" )+'</td> ';} } out+=' <td> ';if(row.timestamp){out+=' '+( MiniProfiler.timestampToRelative(row.timestamp) )+' ';}out+=' </td> </tr> ';} } out+=' </tbody> </table> ';}else{out+=' <h2>No snapshots for '+( data.group_name )+'</h2> ';}return out;
}

if (typeof prettyPrint === "undefined") {
  // prettify.js
  // http://code.google.com/p/google-code-prettify/
  // prettier-ignore
  window.PR_SHOULD_USE_CONTINUATION = true;
  window.PR_TAB_WIDTH = 8;
  window.PR_normalizedHtml = window.PR = window.prettyPrintOne = window.prettyPrint = void 0;

  window._pr_isIE6 = function() {
    var y =
      navigator &&
      navigator.userAgent &&
      navigator.userAgent.match(/\bMSIE ([678])\./);
    y = y ? +y[1] : false;

    window._pr_isIE6 = function() {
      return y;
    };

    return y;
  };

  (function () {
    function y(b) {
      return b.replace(L, "&amp;").replace(M, "&lt;").replace(N, "&gt;");
    }

    function H(b, f, i) {
      switch (b.nodeType) {
        case 1:
          var o = b.tagName.toLowerCase();
          f.push("<", o);
          var l = b.attributes,
              n = l.length;

          if (n) {
            if (i) {
              for (var r = [], j = n; --j >= 0;) {
                r[j] = l[j];
              }

              r.sort(function (q, m) {
                return q.name < m.name ? -1 : q.name === m.name ? 0 : 1;
              });
              l = r;
            }

            for (j = 0; j < n; ++j) {
              r = l[j];
              r.specified && f.push(" ", r.name.toLowerCase(), '="', r.value.replace(L, "&amp;").replace(M, "&lt;").replace(N, "&gt;").replace(X, "&quot;"), '"');
            }
          }

          f.push(">");

          for (l = b.firstChild; l; l = l.nextSibling) {
            H(l, f, i);
          }

          if (b.firstChild || !/^(?:br|link|img)$/.test(o)) f.push("</", o, ">");
          break;

        case 3:
        case 4:
          f.push(y(b.nodeValue));
          break;
      }
    }

    function O(b) {
      function f(c) {
        if (c.charAt(0) !== "\\") return c.charCodeAt(0);

        switch (c.charAt(1)) {
          case "b":
            return 8;

          case "t":
            return 9;

          case "n":
            return 10;

          case "v":
            return 11;

          case "f":
            return 12;

          case "r":
            return 13;

          case "u":
          case "x":
            return parseInt(c.substring(2), 16) || c.charCodeAt(1);

          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
            return parseInt(c.substring(1), 8);

          default:
            return c.charCodeAt(1);
        }
      }

      function i(c) {
        if (c < 32) return (c < 16 ? "\\x0" : "\\x") + c.toString(16);
        c = String.fromCharCode(c);
        if (c === "\\" || c === "-" || c === "[" || c === "]") c = "\\" + c;
        return c;
      }

      function o(c) {
        var d = c.substring(1, c.length - 1).match(RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]", "g"));
        c = [];

        for (var a = [], k = d[0] === "^", e = k ? 1 : 0, h = d.length; e < h; ++e) {
          var g = d[e];

          switch (g) {
            case "\\B":
            case "\\b":
            case "\\D":
            case "\\d":
            case "\\S":
            case "\\s":
            case "\\W":
            case "\\w":
              c.push(g);
              continue;
          }

          g = f(g);
          var s;

          if (e + 2 < h && "-" === d[e + 1]) {
            s = f(d[e + 2]);
            e += 2;
          } else s = g;

          a.push([g, s]);

          if (!(s < 65 || g > 122)) {
            s < 65 || g > 90 || a.push([Math.max(65, g) | 32, Math.min(s, 90) | 32]);
            s < 97 || g > 122 || a.push([Math.max(97, g) & -33, Math.min(s, 122) & -33]);
          }
        }

        a.sort(function (v, w) {
          return v[0] - w[0] || w[1] - v[1];
        });
        d = [];
        g = [NaN, NaN];

        for (e = 0; e < a.length; ++e) {
          h = a[e];
          if (h[0] <= g[1] + 1) g[1] = Math.max(g[1], h[1]);else d.push(g = h);
        }

        a = ["["];
        k && a.push("^");
        a.push.apply(a, c);

        for (e = 0; e < d.length; ++e) {
          h = d[e];
          a.push(i(h[0]));

          if (h[1] > h[0]) {
            h[1] + 1 > h[0] && a.push("-");
            a.push(i(h[1]));
          }
        }

        a.push("]");
        return a.join("");
      }

      function l(c) {
        for (var d = c.source.match(RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)", "g")), a = d.length, k = [], e = 0, h = 0; e < a; ++e) {
          var g = d[e];
          if (g === "(") ++h;else if ("\\" === g.charAt(0)) if ((g = +g.substring(1)) && g <= h) k[g] = -1;
        }

        for (e = 1; e < k.length; ++e) {
          if (-1 === k[e]) k[e] = ++n;
        }

        for (h = e = 0; e < a; ++e) {
          g = d[e];

          if (g === "(") {
            ++h;
            if (k[h] === undefined) d[e] = "(?:";
          } else if ("\\" === g.charAt(0)) if ((g = +g.substring(1)) && g <= h) d[e] = "\\" + k[h];
        }

        for (h = e = 0; e < a; ++e) {
          if ("^" === d[e] && "^" !== d[e + 1]) d[e] = "";
        }

        if (c.ignoreCase && r) for (e = 0; e < a; ++e) {
          g = d[e];
          c = g.charAt(0);
          if (g.length >= 2 && c === "[") d[e] = o(g);else if (c !== "\\") d[e] = g.replace(/[a-zA-Z]/g, function (s) {
            s = s.charCodeAt(0);
            return "[" + String.fromCharCode(s & -33, s | 32) + "]";
          });
        }
        return d.join("");
      }

      for (var n = 0, r = false, j = false, q = 0, m = b.length; q < m; ++q) {
        var t = b[q];
        if (t.ignoreCase) j = true;else if (/[a-z]/i.test(t.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ""))) {
          r = true;
          j = false;
          break;
        }
      }

      var p = [];
      q = 0;

      for (m = b.length; q < m; ++q) {
        t = b[q];
        if (t.global || t.multiline) throw Error("" + t);
        p.push("(?:" + l(t) + ")");
      }

      return RegExp(p.join("|"), j ? "gi" : "g");
    }

    function Y(b) {
      var f = 0;
      return function (i) {
        for (var o = null, l = 0, n = 0, r = i.length; n < r; ++n) {
          switch (i.charAt(n)) {
            case "\t":
              o || (o = []);
              o.push(i.substring(l, n));
              l = b - f % b;

              for (f += l; l >= 0; l -= 16) {
                o.push("                ".substring(0, l));
              }

              l = n + 1;
              break;

            case "\n":
              f = 0;
              break;

            default:
              ++f;
          }
        }

        if (!o) return i;
        o.push(i.substring(l));
        return o.join("");
      };
    }

    function I(b, f, i, o) {
      if (f) {
        b = {
          source: f,
          c: b
        };
        i(b);
        o.push.apply(o, b.d);
      }
    }

    function B(b, f) {
      var i = {},
          o;

      (function () {
        for (var r = b.concat(f), j = [], q = {}, m = 0, t = r.length; m < t; ++m) {
          var p = r[m],
              c = p[3];
          if (c) for (var d = c.length; --d >= 0;) {
            i[c.charAt(d)] = p;
          }
          p = p[1];
          c = "" + p;

          if (!q.hasOwnProperty(c)) {
            j.push(p);
            q[c] = null;
          }
        }

        j.push(/[\0-\uffff]/);
        o = O(j);
      })();

      var l = f.length;

      function n(r) {
        for (var j = r.c, q = [j, z], m = 0, t = r.source.match(o) || [], p = {}, c = 0, d = t.length; c < d; ++c) {
          var a = t[c],
              k = p[a],
              e = void 0,
              h;
          if (typeof k === "string") h = false;else {
            var g = i[a.charAt(0)];

            if (g) {
              e = a.match(g[1]);
              k = g[0];
            } else {
              for (h = 0; h < l; ++h) {
                g = f[h];

                if (e = a.match(g[1])) {
                  k = g[0];
                  break;
                }
              }

              e || (k = z);
            }

            if ((h = k.length >= 5 && "lang-" === k.substring(0, 5)) && !(e && typeof e[1] === "string")) {
              h = false;
              k = P;
            }

            h || (p[a] = k);
          }
          g = m;
          m += a.length;

          if (h) {
            h = e[1];
            var s = a.indexOf(h),
                v = s + h.length;

            if (e[2]) {
              v = a.length - e[2].length;
              s = v - h.length;
            }

            k = k.substring(5);
            I(j + g, a.substring(0, s), n, q);
            I(j + g + s, h, Q(k, h), q);
            I(j + g + v, a.substring(v), n, q);
          } else q.push(j + g, k);
        }

        r.d = q;
      }

      return n;
    }

    function x(b) {
      var f = [],
          i = [];
      if (b.tripleQuotedStrings) f.push([A, /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/, null, "'\""]);else b.multiLineStrings ? f.push([A, /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/, null, "'\"`"]) : f.push([A, /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/, null, "\"'"]);
      b.verbatimStrings && i.push([A, /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null]);
      if (b.hashComments) if (b.cStyleComments) {
        f.push([C, /^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\r\n]*)/, null, "#"]);
        i.push([A, /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/, null]);
      } else f.push([C, /^#[^\r\n]*/, null, "#"]);

      if (b.cStyleComments) {
        i.push([C, /^\/\/[^\r\n]*/, null]);
        i.push([C, /^\/\*[\s\S]*?(?:\*\/|$)/, null]);
      }

      b.regexLiterals && i.push(["lang-regex", RegExp("^" + Z + "(/(?=[^/*])(?:[^/\\x5B\\x5C]|\\x5C[\\s\\S]|\\x5B(?:[^\\x5C\\x5D]|\\x5C[\\s\\S])*(?:\\x5D|$))+/)")]);
      b = b.keywords.replace(/^\s+|\s+$/g, "");
      b.length && i.push([R, RegExp("^(?:" + b.replace(/\s+/g, "|") + ")\\b"), null]);
      f.push([z, /^\s+/, null, " \r\n\t\xA0"]);
      i.push([J, /^@[a-z_$][a-z_$@0-9]*/i, null], [S, /^@?[A-Z]+[a-z][A-Za-z_$@0-9]*/, null], [z, /^[a-z_$][a-z_$@0-9]*/i, null], [J, /^(?:0x[a-f0-9]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+\-]?\d+)?)[a-z]*/i, null, "0123456789"], [E, /^.[^\s\w\.$@\'\"\`\/\#]*/, null]);
      return B(f, i);
    }

    function $(b) {
      function f(D) {
        if (D > r) {
          if (j && j !== q) {
            n.push("</span>");
            j = null;
          }

          if (!j && q) {
            j = q;
            n.push('<span class="', j, '">');
          }

          var T = y(p(i.substring(r, D))).replace(e ? d : c, "$1&#160;");
          e = k.test(T);
          n.push(T.replace(a, s));
          r = D;
        }
      }

      var i = b.source,
          o = b.g,
          l = b.d,
          n = [],
          r = 0,
          j = null,
          q = null,
          m = 0,
          t = 0,
          p = Y(window.PR_TAB_WIDTH),
          c = /([\r\n ]) /g,
          d = /(^| ) /gm,
          a = /\r\n?|\n/g,
          k = /[ \r\n]$/,
          e = true,
          h = window._pr_isIE6();

      h = h ? b.b.tagName === "PRE" ? h === 6 ? "&#160;\r\n" : h === 7 ? "&#160;<br>\r" : "&#160;\r" : "&#160;<br />" : "<br />";
      var g = b.b.className.match(/\blinenums\b(?::(\d+))?/),
          s;

      if (g) {
        for (var v = [], w = 0; w < 10; ++w) {
          v[w] = h + '</li><li class="L' + w + '">';
        }

        var F = g[1] && g[1].length ? g[1] - 1 : 0;
        n.push('<ol class="linenums"><li class="L', F % 10, '"');
        F && n.push(' value="', F + 1, '"');
        n.push(">");

        s = function s() {
          var D = v[++F % 10];
          return j ? "</span>" + D + '<span class="' + j + '">' : D;
        };
      } else s = h;

      for (;;) {
        if (m < o.length ? t < l.length ? o[m] <= l[t] : true : false) {
          f(o[m]);

          if (j) {
            n.push("</span>");
            j = null;
          }

          n.push(o[m + 1]);
          m += 2;
        } else if (t < l.length) {
          f(l[t]);
          q = l[t + 1];
          t += 2;
        } else break;
      }

      f(i.length);
      j && n.push("</span>");
      g && n.push("</li></ol>");
      b.a = n.join("");
    }

    function u(b, f) {
      for (var i = f.length; --i >= 0;) {
        var o = f[i];
        if (G.hasOwnProperty(o)) "console" in window && console.warn("cannot override language handler %s", o);else G[o] = b;
      }
    }

    function Q(b, f) {
      b && G.hasOwnProperty(b) || (b = /^\s*</.test(f) ? "default-markup" : "default-code");
      return G[b];
    }

    function U(b) {
      var f = b.f,
          i = b.e;
      b.a = f;

      try {
        var o,
            l = f.match(aa);
        f = [];
        var n = 0,
            r = [];
        if (l) for (var j = 0, q = l.length; j < q; ++j) {
          var m = l[j];

          if (m.length > 1 && m.charAt(0) === "<") {
            if (!ba.test(m)) if (ca.test(m)) {
              f.push(m.substring(9, m.length - 3));
              n += m.length - 12;
            } else if (da.test(m)) {
              f.push("\n");
              ++n;
            } else if (m.indexOf(V) >= 0 && m.replace(/\s(\w+)\s*=\s*(?:\"([^\"]*)\"|'([^\']*)'|(\S+))/g, ' $1="$2$3$4"').match(/[cC][lL][aA][sS][sS]=\"[^\"]*\bnocode\b/)) {
              var t = m.match(W)[2],
                  p = 1,
                  c;
              c = j + 1;

              a: for (; c < q; ++c) {
                var d = l[c].match(W);
                if (d && d[2] === t) if (d[1] === "/") {
                  if (--p === 0) break a;
                } else ++p;
              }

              if (c < q) {
                r.push(n, l.slice(j, c + 1).join(""));
                j = c;
              } else r.push(n, m);
            } else r.push(n, m);
          } else {
            var a;
            p = m;
            var k = p.indexOf("&");
            if (k < 0) a = p;else {
              for (--k; (k = p.indexOf("&#", k + 1)) >= 0;) {
                var e = p.indexOf(";", k);

                if (e >= 0) {
                  var h = p.substring(k + 3, e),
                      g = 10;

                  if (h && h.charAt(0) === "x") {
                    h = h.substring(1);
                    g = 16;
                  }

                  var s = parseInt(h, g);
                  isNaN(s) || (p = p.substring(0, k) + String.fromCharCode(s) + p.substring(e + 1));
                }
              }

              a = p.replace(ea, "<").replace(fa, ">").replace(ga, "'").replace(ha, '"').replace(ia, " ").replace(ja, "&");
            }
            f.push(a);
            n += a.length;
          }
        }
        o = {
          source: f.join(""),
          h: r
        };
        var v = o.source;
        b.source = v;
        b.c = 0;
        b.g = o.h;
        Q(i, v)(b);
        $(b);
      } catch (w) {
        if ("console" in window) console.log(w && w.stack ? w.stack : w);
      }
    }

    var A = "str",
        R = "kwd",
        C = "com",
        S = "typ",
        J = "lit",
        E = "pun",
        z = "pln",
        P = "src",
        V = "nocode",
        Z = function () {
      for (var b = ["!", "!=", "!==", "#", "%", "%=", "&", "&&", "&&=", "&=", "(", "*", "*=", "+=", ",", "-=", "->", "/", "/=", ":", "::", ";", "<", "<<", "<<=", "<=", "=", "==", "===", ">", ">=", ">>", ">>=", ">>>", ">>>=", "?", "@", "[", "^", "^=", "^^", "^^=", "{", "|", "|=", "||", "||=", "~", "break", "case", "continue", "delete", "do", "else", "finally", "instanceof", "return", "throw", "try", "typeof"], f = "(?:^^|[+-]", i = 0; i < b.length; ++i) {
        f += "|" + b[i].replace(/([^=<>:&a-z])/g, "\\$1");
      }

      f += ")\\s*";
      return f;
    }(),
        L = /&/g,
        M = /</g,
        N = />/g,
        X = /\"/g,
        ea = /&lt;/g,
        fa = /&gt;/g,
        ga = /&apos;/g,
        ha = /&quot;/g,
        ja = /&amp;/g,
        ia = /&nbsp;/g,
        ka = /[\r\n]/g,
        K = null,
        aa = RegExp("[^<]+|<!--[\\s\\S]*?-->|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>|</?[a-zA-Z](?:[^>\"']|'[^']*'|\"[^\"]*\")*>|<", "g"),
        ba = /^<\!--/,
        ca = /^<!\[CDATA\[/,
        da = /^<br\b/i,
        W = /^<(\/?)([a-zA-Z][a-zA-Z0-9]*)/,
        la = x({
      keywords: "break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof alignof align_union asm axiom bool concept concept_map const_cast constexpr decltype dynamic_cast explicit export friend inline late_check mutable namespace nullptr reinterpret_cast static_assert static_cast template typeid typename using virtual wchar_t where break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof abstract boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient as base by checked decimal delegate descending event fixed foreach from group implicit in interface internal into is lock object out override orderby params partial readonly ref sbyte sealed stackalloc string select uint ulong unchecked unsafe ushort var break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof debugger eval export function get null set undefined var with Infinity NaN caller delete die do dump elsif eval exit foreach for goto if import last local my next no our print package redo require sub undef unless until use wantarray while BEGIN END break continue do else for if return while and as assert class def del elif except exec finally from global import in is lambda nonlocal not or pass print raise try with yield False True None break continue do else for if return while alias and begin case class def defined elsif end ensure false in module next nil not or redo rescue retry self super then true undef unless until when yield BEGIN END break continue do else for if return while case done elif esac eval fi function in local set then until ",
      hashComments: true,
      cStyleComments: true,
      multiLineStrings: true,
      regexLiterals: true
    }),
        G = {};

    u(la, ["default-code"]);
    u(B([], [[z, /^[^<?]+/], ["dec", /^<!\w[^>]*(?:>|$)/], [C, /^<\!--[\s\S]*?(?:-\->|$)/], ["lang-", /^<\?([\s\S]+?)(?:\?>|$)/], ["lang-", /^<%([\s\S]+?)(?:%>|$)/], [E, /^(?:<[%?]|[%?]>)/], ["lang-", /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i], ["lang-js", /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i], ["lang-css", /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i], ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]]), ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]);
    u(B([[z, /^[\s]+/, null, " \t\r\n"], ["atv", /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, "\"'"]], [["tag", /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i], ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i], ["lang-uq.val", /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/], [E, /^[=<>\/]+/], ["lang-js", /^on\w+\s*=\s*\"([^\"]+)\"/i], ["lang-js", /^on\w+\s*=\s*\'([^\']+)\'/i], ["lang-js", /^on\w+\s*=\s*([^\"\'>\s]+)/i], ["lang-css", /^style\s*=\s*\"([^\"]+)\"/i], ["lang-css", /^style\s*=\s*\'([^\']+)\'/i], ["lang-css", /^style\s*=\s*([^\"\'>\s]+)/i]]), ["in.tag"]);
    u(B([], [["atv", /^[\s\S]+/]]), ["uq.val"]);
    u(x({
      keywords: "break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof alignof align_union asm axiom bool concept concept_map const_cast constexpr decltype dynamic_cast explicit export friend inline late_check mutable namespace nullptr reinterpret_cast static_assert static_cast template typeid typename using virtual wchar_t where ",
      hashComments: true,
      cStyleComments: true
    }), ["c", "cc", "cpp", "cxx", "cyc", "m"]);
    u(x({
      keywords: "null true false"
    }), ["json"]);
    u(x({
      keywords: "break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof abstract boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient as base by checked decimal delegate descending event fixed foreach from group implicit in interface internal into is lock object out override orderby params partial readonly ref sbyte sealed stackalloc string select uint ulong unchecked unsafe ushort var ",
      hashComments: true,
      cStyleComments: true,
      verbatimStrings: true
    }), ["cs"]);
    u(x({
      keywords: "break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof abstract boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient ",
      cStyleComments: true
    }), ["java"]);
    u(x({
      keywords: "break continue do else for if return while case done elif esac eval fi function in local set then until ",
      hashComments: true,
      multiLineStrings: true
    }), ["bsh", "csh", "sh"]);
    u(x({
      keywords: "break continue do else for if return while and as assert class def del elif except exec finally from global import in is lambda nonlocal not or pass print raise try with yield False True None ",
      hashComments: true,
      multiLineStrings: true,
      tripleQuotedStrings: true
    }), ["cv", "py"]);
    u(x({
      keywords: "caller delete die do dump elsif eval exit foreach for goto if import last local my next no our print package redo require sub undef unless until use wantarray while BEGIN END ",
      hashComments: true,
      multiLineStrings: true,
      regexLiterals: true
    }), ["perl", "pl", "pm"]);
    u(x({
      keywords: "break continue do else for if return while alias and begin case class def defined elsif end ensure false in module next nil not or redo rescue retry self super then true undef unless until when yield BEGIN END ",
      hashComments: true,
      multiLineStrings: true,
      regexLiterals: true
    }), ["rb"]);
    u(x({
      keywords: "break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof debugger eval export function get null set undefined var with Infinity NaN ",
      cStyleComments: true,
      regexLiterals: true
    }), ["js"]);
    u(B([], [[A, /^[\s\S]+/]]), ["regex"]);
    window.PR_normalizedHtml = H;

    window.prettyPrintOne = function (b, f) {
      var i = {
        f: b,
        e: f
      };
      U(i);
      return i.a;
    };

    window.prettyPrint = function (b) {
      function f() {
        for (var t = window.PR_SHOULD_USE_CONTINUATION ? j.now() + 250 : Infinity; q < o.length && j.now() < t; q++) {
          var p = o[q];

          if (p.className && p.className.indexOf("prettyprint") >= 0) {
            var c = p.className.match(/\blang-(\w+)\b/);
            if (c) c = c[1];

            for (var d = false, a = p.parentNode; a; a = a.parentNode) {
              if ((a.tagName === "pre" || a.tagName === "code" || a.tagName === "xmp") && a.className && a.className.indexOf("prettyprint") >= 0) {
                d = true;
                break;
              }
            }

            if (!d) {
              a = p;

              if (null === K) {
                d = document.createElement("PRE");
                d.appendChild(document.createTextNode('<!DOCTYPE foo PUBLIC "foo bar">\n<foo />'));
                K = !/</.test(d.innerHTML);
              }

              if (K) {
                d = a.innerHTML;
                if ("XMP" === a.tagName) d = y(d);else {
                  a = a;
                  if ("PRE" === a.tagName) a = true;else if (ka.test(d)) {
                    var k = "";
                    if (a.currentStyle) k = a.currentStyle.whiteSpace;else if (window.getComputedStyle) k = window.getComputedStyle(a, null).whiteSpace;
                    a = !k || k === "pre";
                  } else a = true;
                  a || (d = d.replace(/(<br\s*\/?>)[\r\n]+/g, "$1").replace(/(?:[\r\n]+[ \t]*)+/g, " "));
                }
                d = d;
              } else {
                d = [];

                for (a = a.firstChild; a; a = a.nextSibling) {
                  H(a, d);
                }

                d = d.join("");
              }

              d = d.replace(/(?:\r\n?|\n)$/, "");
              m = {
                f: d,
                e: c,
                b: p
              };
              U(m);

              if (p = m.a) {
                c = m.b;

                if ("XMP" === c.tagName) {
                  d = document.createElement("PRE");

                  for (a = 0; a < c.attributes.length; ++a) {
                    k = c.attributes[a];
                    if (k.specified) if (k.name.toLowerCase() === "class") d.className = k.value;else d.setAttribute(k.name, k.value);
                  }

                  d.innerHTML = p;
                  c.parentNode.replaceChild(d, c);
                } else c.innerHTML = p;
              }
            }
          }
        }

        if (q < o.length) setTimeout(f, 250);else b && b();
      }

      for (var i = [document.getElementsByTagName("pre"), document.getElementsByTagName("code"), document.getElementsByTagName("xmp")], o = [], l = 0; l < i.length; ++l) {
        for (var n = 0, r = i[l].length; n < r; ++n) {
          o.push(i[l][n]);
        }
      }

      i = null;
      var j = Date;
      j.now || (j = {
        now: function now() {
          return new Date().getTime();
        }
      });
      var q = 0,
          m;
      f();
    };

    window.PR = {
      combinePrefixPatterns: O,
      createSimpleLexer: B,
      registerLangHandler: u,
      sourceDecorator: x,
      PR_ATTRIB_NAME: "atn",
      PR_ATTRIB_VALUE: "atv",
      PR_COMMENT: C,
      PR_DECLARATION: "dec",
      PR_KEYWORD: R,
      PR_LITERAL: J,
      PR_NOCODE: V,
      PR_PLAIN: z,
      PR_PUNCTUATION: E,
      PR_SOURCE: P,
      PR_STRING: A,
      PR_TAG: "tag",
      PR_TYPE: S
    };
  })(); // prettier-ignore
  // lang-sql.js
  // http://code.google.com/p/google-code-prettify/

  PR.registerLangHandler(
    PR.createSimpleLexer(
      [
        ["pln", /^[\t\n\r \xA0]+/, null, "\t\n\r \xA0"],
        ["str", /^(?:"(?:[^\"\\]|\\.)*"|'(?:[^\'\\]|\\.)*')/, null, "\"'"]
      ],
      [
        ["com", /^(?:--[^\r\n]*|\/\*[\s\S]*?(?:\*\/|$))/],
        [
          "kwd",
          /^(?:ADD|ALL|ALTER|AND|ANY|AS|ASC|AUTHORIZATION|BACKUP|BEGIN|BETWEEN|BREAK|BROWSE|BULK|BY|CASCADE|CASE|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COMMIT|COMPUTE|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATABASE|DBCC|DEALLOCATE|DECLARE|DEFAULT|DELETE|DENY|DESC|DISK|DISTINCT|DISTRIBUTED|DOUBLE|DROP|DUMMY|DUMP|ELSE|END|ERRLVL|ESCAPE|EXCEPT|EXEC|EXECUTE|EXISTS|EXIT|FETCH|FILE|FILLFACTOR|FOR|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GOTO|GRANT|GROUP|HAVING|HOLDLOCK|IDENTITY|IDENTITYCOL|IDENTITY_INSERT|IF|IN|INDEX|INNER|INSERT|INTERSECT|INTO|IS|JOIN|KEY|KILL|LEFT|LIKE|LINENO|LOAD|NATIONAL|NOCHECK|NONCLUSTERED|NOT|NULL|NULLIF|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPENXML|OPTION|OR|ORDER|OUTER|OVER|PERCENT|PLAN|PRECISION|PRIMARY|PRINT|PROC|PROCEDURE|PUBLIC|RAISERROR|READ|READTEXT|RECONFIGURE|REFERENCES|REPLICATION|RESTORE|RESTRICT|RETURN|REVOKE|RIGHT|ROLLBACK|ROWCOUNT|ROWGUIDCOL|RULE|SAVE|SCHEMA|SELECT|SESSION_USER|SET|SETUSER|SHUTDOWN|SOME|STATISTICS|SYSTEM_USER|TABLE|TEXTSIZE|THEN|TO|TOP|TRAN|TRANSACTION|TRIGGER|TRUNCATE|TSEQUAL|UNION|UNIQUE|UPDATE|UPDATETEXT|USE|USER|VALUES|VARYING|VIEW|WAITFOR|WHEN|WHERE|WHILE|WITH|WRITETEXT)(?=[^\w-]|$)/i,
          null
        ],
        [
          "lit",
          /^[+-]?(?:0x[\da-f]+|(?:(?:\.\d+|\d+(?:\.\d*)?)(?:e[+\-]?\d+)?))/i
        ],
        ["pln", /^[a-z_][\w-]*/i],
        ["pun", /^[^\w\t\n\r \xA0\"\'][^\w\t\n\r \xA0+\-\"\']*/]
      ]
    ),
    ["sql"]
  );
}

MiniProfiler.loadedVendor = true;