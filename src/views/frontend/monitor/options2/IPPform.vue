<!--
 * @Author: zwj
 * @Date: 2022-12-02 10:29:28
 * @LastEditors: zwj
 * @LastEditTime: 2022-12-12 11:23:27
 * @Description: 
-->
<template>
    <div class="InputTable">
        <el-table 
            :data="R200InTable" :row-style="{ height: '40px' }" :cell-style="setCellColor"
            style="width: 33%; margin-right: 15px;" :header-cell-style="headerStyle1()">
            <el-table-column prop="name" label="R200预聚反应器进料" align="center" >
                <el-table-column prop="point" label="位号" align="center" />
                <el-table-column prop="description" label="说明" align="center" />
                <el-table-column prop="value" label="数值" align="center" />
                <el-table-column prop="unit" label="单位" align="center" />
            </el-table-column>
        </el-table>
        <el-table 
            :data="R201InTable" :row-style="{ height: '60px' }" :cell-style="setCellColor"
            style="width: 33%; margin-right: 15px" :header-cell-style="headerStyle1()">
            <el-table-column prop="name" label="R201反应器进料" align="center">
                <el-table-column prop="point" label="位号" align="center" />
                <el-table-column prop="description" label="说明" align="center" />
                <el-table-column prop="value" label="数值" align="center" />
                <el-table-column prop="unit" label="单位" align="center" />
            </el-table-column>
        </el-table>
        <el-table 
            :data="R202InTable" :row-style="{ height: '60px' }" :cell-style="setCellColor"
            style="width: 33%" :header-cell-style="headerStyle1()">
            <el-table-column prop="name" label="R202反应器进料" align="center">
                <el-table-column prop="point" label="位号" align="center" />
                <el-table-column prop="description" label="说明" align="center" />
                <el-table-column prop="value" label="数值" align="center" />
                <el-table-column prop="unit" label="单位" align="center" />
            </el-table-column>
        </el-table>
    </div>

    <div class="OutputTable">
        <el-table 
            :data="R200OutTable" :row-style="{ height: '50px' }" :cell-style="setCellColor"
            style="width: 33%; margin-right: 15px;" :header-cell-style="headerStyle2()">
            <el-table-column prop="name" label="R200预聚反应器出料" align="center">
                <el-table-column prop="description" label="说明" align="center" />
                <el-table-column prop="value" label="数值" align="center" />
                <el-table-column prop="unit" label="单位" align="center" />
            </el-table-column>
        </el-table>
        <el-table 
            :data="R201OutTable" :row-style="{ height: '50px' }" :cell-style="setCellColor"
            style="width: 33%; margin-right: 15px" :header-cell-style="headerStyle2()">
            <el-table-column prop="name" label="R201反应器出料" align="center">
                <el-table-column prop="description" label="说明" align="center" />
                <el-table-column prop="value" label="数值" align="center" />
                <el-table-column prop="unit" label="单位" align="center" />
            </el-table-column>
        </el-table>
        <el-table 
            :data="R202OutTable" :row-style="{ height: '50px' }" :cell-style="setCellColor"
            style="width: 33%" :header-cell-style="headerStyle2()">
            <el-table-column prop="name" label="R202反应器出料" align="center">
                <el-table-column prop="description" label="说明" align="center" />
                <el-table-column prop="value" label="数值" align="center" />
                <el-table-column prop="unit" label="单位" align="center" />
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script lang="ts" setup>
import { computed, CSSProperties, reactive, watch } from 'vue';
import { runAspen } from '/@/api/frontend/user';
import { useIppdata } from '/@/stores/ippdata'

const Ippdata = useIppdata()

const R200InTable = reactive([
    {
        point: 'TIC221',
        description: '温度',
        value: String(0),
        unit: '^C',
    },
    {
        point: 'PIC221',
        description: '压力',
        value: String(0),
        unit: 'MPa',
    },
    {
        point: 'FIC204',
        description: 'C3H6',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        point: 'FIC141',
        description: 'TICL4',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        point: 'FIC111',
        description: 'TEAL',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        point: 'FIC121',
        description: 'DONOR',
        value: String(0),
        unit: 'Kg/h',
    },
])

const R201InTable = reactive([
    {
        point: 'TIC241',
        description: '温度',
        value: String(0),
        unit: '^C',
    },
    {
        point: 'PIC241',
        description: '压力',
        value: String(0),
        unit: 'MPa',
    },
    {
        point: 'FIC201',
        description: 'H2',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        point: 'FIC203',
        description: 'TICL4',
        value: String(0),
        unit: 'Kg/h',
    },
])

const R202InTable = reactive([
    {
        point: 'TIC241',
        description: '温度',
        value: String(0),
        unit: '^C',
    },
    {
        point: 'PIC241',
        description: '压力',
        value: String(0),
        unit: 'MPa',
    },
    {
        point: 'FIC201',
        description: 'H2',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        point: 'FIC203',
        description: 'TICL4',
        value: String(0),
        unit: 'Kg/h',
    },
])

const R200OutTable = reactive([
    {
        description: 'H2',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'C3H6',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'TICL4',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'TEA',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'PP',
        value: String(0),
        unit: 'Kg/h',
    },
])

const R201OutTable = reactive([
    {
        description: 'H2',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'C3H6',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'TICL4',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'TEA',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'PP',
        value: String(0),
        unit: 'Kg/h',
    },
])

const R202OutTable = reactive([
    {
        description: 'H2',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'C3H6',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'TICL4',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'TEA',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'PP',
        value: String(0),
        unit: 'Kg/h',
    },
])

let isComolete = true

interface cellstyle {
    row: {
        property:string
    }
    column: {
        property:string
    }
}

watch( () => Ippdata, () => {
    R200InTable.forEach((item) => {
        item.value = Ippdata[item.point]
        console.log(Ippdata[item.point]);
    })
})

const getDcs = computed(() => {
    return Ippdata.getDcs
})

watch(
    () => getDcs.value,
    () => {
        let postdata:{
            reaction: string
            pointlist: number[]
        } = {
            reaction: 'Option1',
            pointlist: []
        }
        R200InTable.forEach((item) => {
            postdata.pointlist.push(Ippdata[item.point])
        })
        R201InTable.forEach((item) => {
            postdata.pointlist.push(Ippdata[item.point])
        })
        R202InTable.forEach((item) => {
            postdata.pointlist.push(Ippdata[item.point])
        })

        runAspen('post', postdata).then((res) => {
            R200InTable.forEach((item) => {
                item.value = Ippdata[item.point]
            })
            R201InTable.forEach((item) => {
                item.value = Ippdata[item.point]
            })
            R202InTable.forEach((item) => {
                item.value = Ippdata[item.point]
            })

            
            R200OutTable.forEach((item, index) => {
                item.value = res.data['Production'][index]
            })
            R201OutTable.forEach((item, index) => {
                item.value = res.data['Production'][index+5]
            })
            R202OutTable.forEach((item, index) => {
                item.value = res.data['Production'][index+10]
            })

            Ippdata.dataFill(res.data)
            
            isComolete = true
        })
    }
)

// const subscribe = Ippdata.$subscribe(
//     (mutation, state) => {
//     /*
//       * mutation主要包含三个属性值：
//       *   events：当前state改变的具体数据，包括改变前的值和改变后的值等等数据
//       *   storeId：是当前store的id
//       *   type：用于记录这次数据变化是通过什么途径，主要有三个分别是
//       *         “direct” ：通过 action 变化的
//                 ”patch object“ ：通过 $patch 传递对象的方式改变的
//                 “patch function” ：通过 $patch 传递函数的方式改变的
//       *
//       * */
//         // 在此处监听store中值的变化，当变化为某个值的时候，做一些业务操作
        
//         setTimeout(()=>{
//             isComolete = true
//         }, 10000)

//         if (isComolete) {
//             isComolete = false

//             let postdata:{
//                 reaction: string
//                 pointlist: number[]
//             } = {
//                 reaction: 'Option1',
//                 pointlist: []
//             }
//             R200InTable.forEach((item) => {
//                 postdata.pointlist.push(state[item.point])
//             })
//             R201InTable.forEach((item) => {
//                 postdata.pointlist.push(state[item.point])
//             })
//             R202InTable.forEach((item) => {
//                 postdata.pointlist.push(state[item.point])
//             })

//             runAspen('post', postdata).then((res) => {
//                 R200InTable.forEach((item) => {
//                     item.value = state[item.point]
//                 })
//                 R201InTable.forEach((item) => {
//                     item.value = state[item.point]
//                 })
//                 R202InTable.forEach((item) => {
//                     item.value = state[item.point]
//                 })

                
//                 R200OutTable.forEach((item, index) => {
//                     item.value = res.data['Production'][index]
//                 })
//                 R201OutTable.forEach((item, index) => {
//                     item.value = res.data['Production'][index+5]
//                 })
//                 R202OutTable.forEach((item, index) => {
//                     item.value = res.data['Production'][index+10]
//                 })

//                 Ippdata.dataFill(res.data)
                
//                 isComolete = true
//             })
//         }
//     },
//     { detached: false } // detached:布尔值，默认是 false，正常情况下，当订阅所在的组件被卸载时，订阅将被停止删除，
//     // 如果设置detached值为 true 时，即使所在组件被卸载，订阅依然在生效
// )

const setCellColor = ( {row, column}:cellstyle ):CSSProperties => {
    if (column.property === 'value') {
        return {color: '#fa0707', 'font-weight': 'bold'}
    } else {
        return {}
    }
}

const headerStyle1 = ():CSSProperties => {
    return {background:'#5f9ea0', opacity: '1', 'font-weight': 'bold', color:'#000000'}
}

const headerStyle2 = ():CSSProperties => {
    return {background:'#6495ed', opacity: '1', 'font-weight': 'bold', color:'#000000'}
}
</script>

<style scoped lang="scss">
.InputTable {
    display: flex;
    margin-top: 10px;
    width: 100%;
    
}

.tableStyle {
    background-color:#6495ed;
    font-weight:400;
    color: #fa0707;
}

.OutputTable {
    display: flex;
    width: 100%;
    color: hsl(219, 79%, 66%);
}
</style>