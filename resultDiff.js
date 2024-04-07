[
    {
        "key": "common",
        "status": "unchanged",
        "value": [
            {
                "key": "setting1",
                "status": "unchanged",
                "value": "Value 1"
            },
            {
                "key": "setting2",
                "status": "deleted",
                "value": 200
            },
            {
                "key": "setting3",
                "status": "changed",
                "oldValue": true,
                "value": null
            },
            {
                "key": "setting6",
                "status": "unchanged",
                "value": [
                    {
                        "key": "key",
                        "status": "unchanged",
                        "value": "value"
                    },
                    {
                        "key": "doge",
                        "status": "unchanged",
                        "value": [
                            {
                                "key": "wow",
                                "status": "changed",
                                "oldValue": "",
                                "value": "so much"
                            }
                        ]
                    },
                    {
                        "key": "ops",
                        "status": "added",
                        "value": "vops"
                    }
                ]
            },
            {
                "key": "follow",
                "status": "added",
                "value": false
            },
            {
                "key": "setting4",
                "status": "added",
                "value": "blah blah"
            },
            {
                "key": "setting5",
                "status": "added",
                "value": {
                    "key5": "value5"
                }
            }
        ]
    },
    {
        "key": "group1",
        "status": "unchanged",
        "value": [
            {
                "key": "baz",
                "status": "changed",
                "oldValue": "bas",
                "value": "bars"
            },
            {
                "key": "foo",
                "status": "unchanged",
                "value": "bar"
            },
            {
                "key": "nest",
                "status": "changed",
                "oldValue": {
                    "key": "value"
                },
                "value": "str"
            }
        ]
    },
    {
        "key": "group2",
        "status": "deleted",
        "value": {
            "abc": 12345,
            "deep": {
                "id": 45
            }
        }
    },
    {
        "key": "group3",
        "status": "added",
        "value": {
            "deep": {
                "id": {
                    "number": 45
                }
            },
            "fee": 100500
        }
    }
]