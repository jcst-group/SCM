export default {
    data() {
        return {
            form: this.$form.createForm(this),
            loading: false,
            pageNo: null,
            pageSize: null,
            pagination: {
                pageSizeOptions: ["10", "20", "50"],
                showTotal: (total, range) => {
                    return range[0] + "-" + range[1] + " 共" + total + "条";
                },
                showQuickJumper: true,
                showSizeChanger: true,
            },
        }
    },
    methods: {
        _loadData() {
            throw new Error('必须有_loadData函数')
        },
        handleReset() {
            this.form.resetFields()
            this._loadData()
        },
        handleSearch() {
            this._loadData()
        },
        changeTable(page) {
            this.pageNo = page.current
            this.pageSize = page.pageSize
            this._loadData()
        },
        openModule(target, record = {}) {
            this.$refs[target].open(record)
        }
    }
}
