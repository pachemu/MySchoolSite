import {NodePath, PluginItem} from "@babel/core";
import {JSXIdentifier} from "@babel/types";

export function removeDataTestIdBabelPlugin(): PluginItem {
    return {
        visitor: {
            Program(path, state) {
                const forbiddenProps = state.opts.props || []
                path.traverse({
                    JSXIdentifier(current: NodePath<JSXIdentifier>) {
                        const nodeName = current.node.name
                        if (forbiddenProps.includes(nodeName)) {
                            current.parentPath.remove()
                        }
                    },
                })
            }
        }
    }
}
