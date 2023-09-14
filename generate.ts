import * as path from "path";
import * as glob from 'glob';
import {execSync} from "child_process";

const examplesGeneratedPath = path.resolve(__dirname, "src");

const opentelemetryProtos = glob.sync(
    path.resolve(__dirname, 'opentelemetry', '**/*.proto')
);

// generating code from open telemetry protos
execSync(`PATH=node_modules/protoc-gen-ts/bin/:$PATH protoc --js_out=import_style=commonjs,binary:${examplesGeneratedPath} --proto_path=${__dirname} -I=/usr/local/include --ts_out=${examplesGeneratedPath} ${opentelemetryProtos.join(" ")}`, {
    stdio: 'inherit',
})
