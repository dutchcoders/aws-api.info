import React from 'react';
import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table';
import _ from 'lodash';
import { browserHistory, Router, Route, Link } from 'react-router'
import 'whatwg-fetch';
import Select from 'react-select';
import lunr from 'lunr';

var versions = [
{ value: 'acm.2015-12-08.json', version: '2015-12-08', service: 'acm', label: 'acm/2015-12-08'},
{ value: 'apigateway.2015-07-09.json', version: '2015-07-09', service: 'apigateway', label: 'apigateway/2015-07-09'},
{ value: 'autoscaling.2016-02-06.json', version: '2016-02-06', service: 'autoscaling', label: 'autoscaling/2016-02-06'},
{ value: 'autoscaling.2011-01-01.json', version: '2011-01-01', service: 'autoscaling', label: 'autoscaling/2011-01-01'},
{ value: 'cloudformation.2010-05-15.json', version: '2010-05-15', service: 'cloudformation', label: 'cloudformation/2010-05-15'},
{ value: 'cloudfront.2016-01-28.json', version: '2016-01-28', service: 'cloudfront', label: 'cloudfront/2016-01-28'},
{ value: 'cloudhsm.2014-05-30.json', version: '2014-05-30', service: 'cloudhsm', label: 'cloudhsm/2014-05-30'},
{ value: 'cloudsearch.2013-01-01.json', version: '2013-01-01', service: 'cloudsearch', label: 'cloudsearch/2013-01-01'},
{ value: 'cloudsearchdomain.2013-01-01.json', version: '2013-01-01', service: 'cloudsearchdomain', label: 'cloudsearchdomain/2013-01-01'},
{ value: 'cloudtrail.2013-11-01.json', version: '2013-11-01', service: 'cloudtrail', label: 'cloudtrail/2013-11-01'},
{ value: 'codecommit.2015-04-13.json', version: '2015-04-13', service: 'codecommit', label: 'codecommit/2015-04-13'},
{ value: 'codedeploy.2014-10-06.json', version: '2014-10-06', service: 'codedeploy', label: 'codedeploy/2014-10-06'},
{ value: 'codepipeline.2015-07-09.json', version: '2015-07-09', service: 'codepipeline', label: 'codepipeline/2015-07-09'},
{ value: 'cognito-identity.2014-06-30.json', version: '2014-06-30', service: 'cognito-identity', label: 'cognito-identity/2014-06-30'},
{ value: 'cognito-idp.2016-04-18.json', version: '2016-04-18', service: 'cognito-idp', label: 'cognito-idp/2016-04-18'},
{ value: 'cognito-sync.2014-06-30.json', version: '2014-06-30', service: 'cognito-sync', label: 'cognito-sync/2014-06-30'},
{ value: 'config.2014-11-12.json', version: '2014-11-12', service: 'config', label: 'config/2014-11-12'},
{ value: 'datapipeline.2012-10-29.json', version: '2012-10-29', service: 'datapipeline', label: 'datapipeline/2012-10-29'},
{ value: 'devicefarm.2015-06-23.json', version: '2015-06-23', service: 'devicefarm', label: 'devicefarm/2015-06-23'},
{ value: 'directconnect.2012-10-25.json', version: '2012-10-25', service: 'directconnect', label: 'directconnect/2012-10-25'},
{ value: 'discovery.2015-11-01.json', version: '2015-11-01', service: 'discovery', label: 'discovery/2015-11-01'},
{ value: 'dms.2016-01-01.json', version: '2016-01-01', service: 'dms', label: 'dms/2016-01-01'},
{ value: 'ds.2015-04-16.json', version: '2015-04-16', service: 'ds', label: 'ds/2015-04-16'},
{ value: 'dynamodb.2012-08-10.json', version: '2012-08-10', service: 'dynamodb', label: 'dynamodb/2012-08-10'},
{ value: 'ec2.2016-04-01.json', version: '2016-04-01', service: 'ec2', label: 'ec2/2016-04-01'},
{ value: 'ecr.2015-09-21.json', version: '2015-09-21', service: 'ecr', label: 'ecr/2015-09-21'},
{ value: 'ecs.2014-11-13.json', version: '2014-11-13', service: 'ecs', label: 'ecs/2014-11-13'},
{ value: 'elasticache.2015-02-02.json', version: '2015-02-02', service: 'elasticache', label: 'elasticache/2015-02-02'},
{ value: 'elasticbeanstalk.2010-12-01.json', version: '2010-12-01', service: 'elasticbeanstalk', label: 'elasticbeanstalk/2010-12-01'},
{ value: 'elasticfilesystem.2015-02-01.json', version: '2015-02-01', service: 'elasticfilesystem', label: 'elasticfilesystem/2015-02-01'},
{ value: 'elasticloadbalancing.2012-06-01.json', version: '2012-06-01', service: 'elasticloadbalancing', label: 'elasticloadbalancing/2012-06-01'},
{ value: 'elasticmapreduce.2009-03-31.json', version: '2009-03-31', service: 'elasticmapreduce', label: 'elasticmapreduce/2009-03-31'},
{ value: 'elastictranscoder.2012-09-25.json', version: '2012-09-25', service: 'elastictranscoder', label: 'elastictranscoder/2012-09-25'},
{ value: 'email.2010-12-01.json', version: '2010-12-01', service: 'email', label: 'email/2010-12-01'},
{ value: 'es.2015-01-01.json', version: '2015-01-01', service: 'es', label: 'es/2015-01-01'},
{ value: 'events.2015-10-07.json', version: '2015-10-07', service: 'events', label: 'events/2015-10-07'},
{ value: 'firehose.2015-08-04.json', version: '2015-08-04', service: 'firehose', label: 'firehose/2015-08-04'},
{ value: 'gamelift.2015-10-01.json', version: '2015-10-01', service: 'gamelift', label: 'gamelift/2015-10-01'},
{ value: 'glacier.2012-06-01.json', version: '2012-06-01', service: 'glacier', label: 'glacier/2012-06-01'},
{ value: 'iam.2010-05-08.json', version: '2010-05-08', service: 'iam', label: 'iam/2010-05-08'},
{ value: 'inspector.2016-02-16.json', version: '2016-02-16', service: 'inspector', label: 'inspector/2016-02-16'},
{ value: 'data.iot.2015-05-28.json', version: '2015-05-28', service: 'data.iot', label: 'data.iot/2015-05-28'},
{ value: 'iot.2015-05-28.json', version: '2015-05-28', service: 'iot', label: 'iot/2015-05-28'},
{ value: 'kinesis.2013-12-02.json', version: '2013-12-02', service: 'kinesis', label: 'kinesis/2013-12-02'},
{ value: 'kms.2014-11-01.json', version: '2014-11-01', service: 'kms', label: 'kms/2014-11-01'},
{ value: 'lambda.2015-03-31.json', version: '2015-03-31', service: 'lambda', label: 'lambda/2015-03-31'},
{ value: 'logs.2014-03-28.json', version: '2014-03-28', service: 'logs', label: 'logs/2014-03-28'},
{ value: 'machinelearning.2014-12-12.json', version: '2014-12-12', service: 'machinelearning', label: 'machinelearning/2014-12-12'},
{ value: 'marketplacecommerceanalytics.2015-07-01.json', version: '2015-07-01', service: 'marketplacecommerceanalytics', label: 'marketplacecommerceanalytics/2015-07-01'},
{ value: 'metering.marketplace.2016-01-14.json', version: '2016-01-14', service: 'metering.marketplace', label: 'metering.marketplace/2016-01-14'},
{ value: 'mobileanalytics.2014-06-05.json', version: '2014-06-05', service: 'mobileanalytics', label: 'mobileanalytics/2014-06-05'},
{ value: 'monitoring.2010-08-01.json', version: '2010-08-01', service: 'monitoring', label: 'monitoring/2010-08-01'},
{ value: 'opsworks.2013-02-18.json', version: '2013-02-18', service: 'opsworks', label: 'opsworks/2013-02-18'},
{ value: 'rds.2014-10-31.json', version: '2014-10-31', service: 'rds', label: 'rds/2014-10-31'},
{ value: 'redshift.2012-12-01.json', version: '2012-12-01', service: 'redshift', label: 'redshift/2012-12-01'},
{ value: 'route53.2013-04-01.json', version: '2013-04-01', service: 'route53', label: 'route53/2013-04-01'},
{ value: 'route53domains.2014-05-15.json', version: '2014-05-15', service: 'route53domains', label: 'route53domains/2014-05-15'},
{ value: 's3.2006-03-01.json', version: '2006-03-01', service: 's3', label: 's3/2006-03-01'},
{ value: 'sdb.2009-04-15.json', version: '2009-04-15', service: 'sdb', label: 'sdb/2009-04-15'},
{ value: 'servicecatalog.2015-12-10.json', version: '2015-12-10', service: 'servicecatalog', label: 'servicecatalog/2015-12-10'},
{ value: 'sns.2010-03-31.json', version: '2010-03-31', service: 'sns', label: 'sns/2010-03-31'},
{ value: 'sqs.2012-11-05.json', version: '2012-11-05', service: 'sqs', label: 'sqs/2012-11-05'},
{ value: 'ssm.2014-11-06.json', version: '2014-11-06', service: 'ssm', label: 'ssm/2014-11-06'},
{ value: 'storagegateway.2013-06-30.json', version: '2013-06-30', service: 'storagegateway', label: 'storagegateway/2013-06-30'},
{ value: 'streams.dynamodb.2012-08-10.json', version: '2012-08-10', service: 'streams.dynamodb', label: 'streams.dynamodb/2012-08-10'},
{ value: 'sts.2011-06-15.json', version: '2011-06-15', service: 'sts', label: 'sts/2011-06-15'},
{ value: 'support.2013-04-15.json', version: '2013-04-15', service: 'support', label: 'support/2013-04-15'},
{ value: 'swf.2012-01-25.json', version: '2012-01-25', service: 'swf', label: 'swf/2012-01-25'},
{ value: 'waf.2015-08-24.json', version: '2015-08-24', service: 'waf', label: 'waf/2015-08-24'},
{ value: 'workspaces.2015-04-08.json', version: '2015-04-08', service: 'workspaces', label: 'workspaces/2015-04-08'},
];

var idx = lunr(function () {
    this.field('title', { boost: 10 })
    this.field('body')
});

var doc = {
    "title": "Twelfth-Night",
    "body": "If music be the food of love, play on: Give me excess of it…",
    "author": "William Shakespeare",
    "id": 1
}

idx.add(doc);

idx.search("love");


class Shape extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const shape = this.props.docs.Shapes[this.props.shape.shape];

        if (_.isUndefined(shape)) {
            return <li>{ this.props.shape.shape } </li>;
        }
        // check for required
        console.debug(this.props.shape);
        console.debug(shape);

        var enums = null;
        if (shape.Enum) {
            enums = <span className="enums">Enums [ {shape.Enum.join(', ') } ]</span>;
        }

        var deprecated = null;
        if (this.props.shape.deprecated) {
                deprecated = <span>Deprecated { this.props.shape.deprecated }</span>;
        }

        var streaming = null;
        if (this.props.shape.streaming) {
                streaming = <span>Streaming { this.props.shape.streaming }</span>;
        }

        var location = null;
        if (this.props.shape.Location) {
            location = <span className="location"><span className="name">{ this.props.shape.LocationName }</span> <span className="type">({ shape.Type })</span> in { this.props.shape.Location }</span>;
        }

        return <div>
                <span className="name">{ this.props.shape.shape }&nbsp;</span>
                <span>{location} </span>
                <span className="documentation" dangerouslySetInnerHTML={ { __html: this.props.shape.Documentation }}></span>
                { deprecated }
                { streaming }
                { enums }
                <ul>
                { _.map(shape.members, (shape, key) =>
                        <li className="shape"><Shape docs={this.props.docs} operation={this.props.operation} shape={ shape }/></li>
                   )
                }
                </ul>
        </div>;
    }
}

class Row extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const operation = this.props.operation;

        console.debug(operation);

        return <tr className="instance">
                <td><b>{ operation.ExportedName }</b>&nbsp;
                <span dangerouslySetInnerHTML={ { __html: operation.Documentation }}></span>
                </td>
                <td>{ operation.HTTP.RequestURI }</td>
                <td>{ operation.HTTP.Method }</td>
                <td className="shape"><Shape docs={this.props.docs} operation={operation} shape={operation.input}/></td>
                <td className="shape"><Shape docs={this.props.docs} operation={operation} shape={operation.output}/></td>
                </tr>;
    }
}

class Operations extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const operations = this.props.operations;
        const docs = this.props.docs;

        if (operations.length == 0) {
            return <tbody>No results found.</tbody>;
        }

        return <tbody>
                { _.map(operations, (operation, key) =>
                        <Row key={key} docs={docs} operation={operation} />
                       )
                }
                </tbody>;
    }
}

class RootView extends React.Component {
    constructor(props){
        super(props);

        this.state = { docs:[], error: null, path: (this.props.location.pathname || ''), q: (this.props.location.query.q || '') };

    }
    componentDidMount() {
        if (_.isUndefined(this.props.params.version)) {
            browserHistory.replace(_.assign(this.props.location, {pathname: "/s3/2006-03-01" }));
        } else {
            this.load(this.props.params.service, this.props.params.version);
        }
    }
    load(service, version) {
        var $this = this;
        fetch("/docs/" + service + "." + version + ".json").then(function(response) {
            if (response.status !== 200) {
                $this.setState({error: { code: response.status }});
                return;
            }

            response.json().then(function(data) {
                $this.setState({docs: data});
            });
        });
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.params.service !== nextProps.params.service || this.props.params.version !== nextProps.params.version) {
            this.load(nextProps.params.service, nextProps.params.version);
        }
    }
    onVersionChange(v, event) {
        browserHistory.push(_.assign(this.props.location, {pathname: "/" + v.service + "/" + v.version }));
    }
    onChange(event) {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        var $this = this;

        const q = event.target.value;
        this.timer = setTimeout(function() {
            if (q == '') {
                browserHistory.push(_.assign($this.props.location, {query:''}));
            } else {
                browserHistory.push(_.assign($this.props.location, {query:{ q: q}}));
            }
        }, 200);

        this.setState({q: q});
    }
    render() {
        const docs = this.state.docs;
        const q = this.props.location.query.q;

        console.debug(docs);

        if (_.isUndefined(docs.Metadata)) {
            return <div>Loading..</div>;
        }

        var operations = _.filter(docs.Operations, function(doc) {
            var re = new RegExp(q, 'gi');
            return doc.ExportedName.match(re) || doc.Documentation.match(re);
        });


        if (this.state.error != null) {
            return <div>{this.state.error.code}</div>
        }

        return <div>
                <div className="row">
                <form className="form-inline ">
                    <div className="input-group col-lg-9">
                          <input placeholder="type to filter" className="form-control" onChange={this.onChange.bind(this)} value={ this.state.q }/>
                    </div>
                    <div className="input-group col-lg-offset-1 col-lg-2">
                    <Select
                        name="form-field-name"
                        value={this.props.params.service + "." + this.props.params.version + ".json" }
                        options={versions}
                        onChange={this.onVersionChange.bind(this)}
                    />
                    </div>
                </form>
                </div>
                <div className="row">
                    <p>Version: {docs.Metadata.APIVersion}</p>
                   <p>Endpoint: {docs.Metadata.EndpointPrefix}</p>
                   <p>JSONVersion: {docs.Metadata.JSONVersion}</p>
                   <p>Protocol: {docs.Metadata.Protocol}</p>
                   <p>Abbreviation: {docs.Metadata.ServiceAbbreviation}</p>
                   <p>FullName: {docs.Metadata.ServiceFullName}</p>
                   <p>Signature: {docs.Metadata.SignatureVersion}</p>
                </div>
                <div className="row">
                <div className="table-responsive">
                <table className="table table-bordered table-hover table-condensed table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>URI</th>
                            <th>Method</th>
                            <th>Input</th>
                            <th>Output</th>
                        </tr>
                    </thead>
                    <Operations operations={operations} docs={docs} />
                </table>
            </div>
            </div>
            </div>
    }
}

ReactDOM.render((
  <Router
    history={browserHistory}
    onUpdate={() => { if (_.isUndefined(window.ga)) return; window.ga('send', 'pageview', location.pathname + location.search ); }}>
      <Route path='/:service/:version' component={RootView} />
      <Route path='/' component={RootView} />
  </Router>
), document.getElementById('app'))




