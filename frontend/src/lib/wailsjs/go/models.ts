export namespace main {
	
	export class Activity {
	    id: number;
	    name: string;
	    total_time: number;
	
	    static createFrom(source: any = {}) {
	        return new Activity(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.total_time = source["total_time"];
	    }
	}

}

