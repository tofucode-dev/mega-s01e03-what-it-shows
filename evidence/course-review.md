# Course review history

## First content submission

Repository at commit `ca7ef36` had three tickets: parser 374, form hint 33,
and a combined timing investigation covering five reports.

The course rejected that submission:

> Not accepted. Check your tickets against the task, then send the repo again.

The support desk's Challenge hint was:

> That's one ticket for two problems. The desk keeps one per problem.

## Change made

Separated R-41236 (an invite reportedly arriving before booking creation) from
the four reports describing one-day date shifts. These are different observed
problems; no evidence established a shared cause. GitHub issue 3 now covers
four one-day shifts; issue 4 covers the premature invite. Parser 374 and hint 33
are unchanged. Updated the computed membership, signed page and actual HTML.

The first tool call also used the unsupported answer field `repoUrl`; the
accepted input shape is an answer object with `repo` set to `owner/name` or a
GitHub repository URL. That format correction did not change the artifacts.

## Later content submissions

The same “one ticket for two problems” hint returned after separating the
premature invite. Each ticket had repeated the full multi-problem reconciliation.
We narrowed the issue bodies to their own scope and kept the complete comparison
in the KB. The next desk hint was:

> Right problems. The desk counts with its own view, as it was exported.

We corrected the counting basis to the exported CauseTable: parser 379 and hint 33.
The five desk-note reports remain in the parser count, as the original component
explicitly specifies. Four one-day shifts and one premature invite remain flagged
in supplementary investigations. Their counts overlap the parser ticket and must
not be added to the two cause totals. The earlier 374/33/4/1 disjoint classification
was our interpretation, not the desk's exported view, and is superseded.
